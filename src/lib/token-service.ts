import { TokenPayload } from "@/types/user-types";
import jwt from "jsonwebtoken";

export class TokenService {
  private static SECRET = process.env.JWT_SECRET || "your-secret-key";
  private static TOKEN_EXPIRY = "1d";

  static generateToken(payload: Omit<TokenPayload, "iat" | "exp">): string {
    return jwt.sign(payload, this.SECRET, { expiresIn: this.TOKEN_EXPIRY });
  }

  static verifyToken(token: string): TokenPayload | null {
    try {
      return jwt.verify(token, this.SECRET) as TokenPayload;
    } catch {
      return null;
    }
  }

  static decodeToken(token: string): TokenPayload | null {
    try {
      return jwt.decode(token) as TokenPayload;
    } catch {
      return null;
    }
  }

  static isTokenExpired(token: string): boolean {
    const decoded = this.decodeToken(token);
    if (!decoded || !decoded.exp) return true;
    return Date.now() >= decoded.exp * 1000;
  }
}
