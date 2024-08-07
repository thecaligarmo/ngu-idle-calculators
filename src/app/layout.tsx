'use client'
import { DataWrapper } from "@/components/context";
import Nav from "@/components/nav";
import { Inter } from "next/font/google";
import { PropsWithChildren } from "react";
import "./ui/globals.css";


const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children } : PropsWithChildren) {
  return (
      <html lang="en">
        <body className={inter.className}>
          <DataWrapper>
            <Nav />
            {children}
          </DataWrapper>
        </body>
      </html>
  );
}
