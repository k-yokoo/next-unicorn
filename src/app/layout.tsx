import { Inter } from "next/font/google";
import React from "react";
import { getServerSession } from "next-auth";
import { NextAuthProvider } from "./context/nextAuthProvider";
import authOptions from "@/lib/nextAuthOptions";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider session={session}>{children}</NextAuthProvider>
      </body>
    </html>
  );
}