'use client'
import { Inter } from "next/font/google";
import "./ui/globals.css";
import {  DataWrapper } from "@/components/context";
import { PropsWithChildren } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children } : PropsWithChildren) {
  return (
      <html lang="en">
        <body className={inter.className}>
          <DataWrapper>
            {/* <Nav /> */}
            {children}
          </DataWrapper>
        </body>
      </html>
  );
}
