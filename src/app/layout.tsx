import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/Components/providers";

const JetBrainsMono = JetBrains_Mono({
  variable:"--font-jetbrains-mono",
  subsets: ["latin"]

})

export const metadata: Metadata = {
  title: "GhostChat",
  description: "Secure, Ephemeral Chat Rooms",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${JetBrainsMono.variable}  antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
