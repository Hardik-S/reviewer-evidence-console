import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Reviewer Evidence Console",
  description: "Turn project evidence into a reviewer-ready proof packet."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
