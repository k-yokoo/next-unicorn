import React from "react";
import { getServerSession } from "next-auth";
import { NextAuthProvider } from "./context/nextAuthProvider";
import authOptions from "@/lib/nextAuthOptions";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="jp">
      <body>
        <NextAuthProvider session={session}>{children}</NextAuthProvider>
      </body>
    </html>
  );
}