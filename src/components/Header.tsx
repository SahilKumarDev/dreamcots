"use client";

import Image from "next/image";
import Link from "next/link";
import { NavItem } from "@/components/_components/Nav-Item";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { ProfileUser } from "./_components/Profile";
import { SidebarProvider } from "./ui/sidebar";

const Header = () => {
  const [user, setUser] = useState({
    isAuthenticated: false,
    user: null,
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/check", {
          credentials: "include",
        });
        const data = await response.json();
        setUser({
          isAuthenticated: data.isAuthenticated,
          user: data.user,
        });
      } catch (error) {
        console.error("Auth check failed:", error);
        setUser({
          isAuthenticated: false,
          user: null,
        });
      }
    };

    checkAuth();
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-10">
      <div className="max-w-screen-2xl mx-auto backdrop-blur-sm border-bottom px-12 py-4">
        <div className="flex-between">
          <Image src={"/logo.svg"} width={100} height={100} alt={"logo"} />
          <NavItem />
          {user.isAuthenticated ? (
            <SidebarProvider className="!min-h-fit w-fit">
              <ProfileUser user={user.user} />
            </SidebarProvider>
          ) : (
            <Link href={"/login"}>
              <Button>Login</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
