import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { ControlTeamsProvider } from "@/context/controlTeamsContext";
import { ControlTeamsFiltredProvider } from "@/context/controlTeamsFiltredContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Digital Teams",
  description: "The ultimate messaging app for your organization",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ControlTeamsProvider>
          <ControlTeamsFiltredProvider>
            <Header />
            {children}
          </ControlTeamsFiltredProvider>
        </ControlTeamsProvider>
      </body>
    </html>
  );
}
