import bcrypt from "bcryptjs";

export interface PasswordValidationRules {
  minLength: number;
}

const defaultRules: PasswordValidationRules = {
  minLength: 6,
};

export class PasswordService {
  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  static async verifyPassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  static validatePasswordStrength(
    password: string,
    rules: PasswordValidationRules = defaultRules
  ): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    if (password.length < rules.minLength) {
      errors.push(
        `Password must be at least ${rules.minLength} characters long`
      );
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}
