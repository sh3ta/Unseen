import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "UNSEEN — Your thoughts, your universe",
  description: "A quiet universe for thoughts, memories, confessions, and unseen sides of life."
};
export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return <html lang="az"><body>{children}</body></html>;
}