'use client'
import { Inter } from "next/font/google";
import "./ui/globals.css";
import {  DataWrapper } from "@/helpers/context";
import Nav from "@/components/nav";
import { PropsWithChildren } from "react";

// BigInt.prototype.toJSON = function() { return this.toString() }


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
