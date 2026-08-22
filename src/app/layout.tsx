import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "BeeSpell Dictionary - Spelling Bee Learning",
  description: "Learn spelling step-by-step from zero to champion with interactive levels and quizzes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header className="navbar">
          <div className="container">
            <Link href="/" className="logo text-gradient-primary">
              🐝 BeeSpell
            </Link>
            <nav className="nav-links">
              <Link href="/levels" className="nav-link">Levels Journey</Link>
              <Link href="/progress" className="nav-link">Progress</Link>
              <Link href="/about" className="nav-link">About</Link>
            </nav>
          </div>
        </header>
        <main className="main-content">
          <div className="container">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
