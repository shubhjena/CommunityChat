import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { StateProvider } from "../context/StateProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Community Chat",
  description: "A community chatting platform.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StateProvider>
          <div>{children}</div>
        </StateProvider>
      </body>
    </html>
  );
}
