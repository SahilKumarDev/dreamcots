import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Header from "@/components/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dreamcots | Home",
  description: "Generated by create next app",
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MaxWidthWrapper>
      <Header />
      {children}
    </MaxWidthWrapper>
  );
}
