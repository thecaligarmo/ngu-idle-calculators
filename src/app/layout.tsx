'use client'
import { DataWrapper } from "@/components/context";
import Nav from "@/components/nav";
import { Inter } from "next/font/google";
import { PropsWithChildren } from "react";
import "./ui/globals.css";
import Footer from "@/components/footer";
import {GoogleTagManager} from '@next/third-parties/google'


const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children } : PropsWithChildren) {
  return (
      <html lang="en">
        <body className={inter.className}>
          <GoogleTagManager gtmId="G-J27N7LHCK8" />
          <DataWrapper>
            <Nav />
            {children}
          </DataWrapper>
          <Footer />
        </body>
      </html>
  );
}