import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { TRPCProvider } from "@/trpc/client";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "QuickDraw Editor",
  description: "Graphical editor for QuickDraw datasets",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TRPCProvider>{children}</TRPCProvider>
      </body>
    </html>
  );
}
