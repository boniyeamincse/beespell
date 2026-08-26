import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
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
        <Navbar />
        <main className="main-content">
          <div className="container">
            {children}
          </div>
        </main>

        <footer className="site-footer">
          <div className="footer-content">
            <div className="footer-links">
              <Link href="/about" className="footer-link">About BeeSpell</Link>
              <Link href="/privacy" className="footer-link">Privacy Policy</Link>
              <Link href="/terms" className="footer-link">Terms of Service</Link>
              <Link href="/contact" className="footer-link">Contact Us</Link>
            </div>
            
            <a href="https://buymeacoffee.com/boniyeamin" target="_blank" rel="noopener noreferrer" className="donation-btn">
              🍯 Buy us some Honey (Donate)
            </a>
            
            <div className="copyright">
              © {new Date().getFullYear()} BeeSpell Learning Platform. Designed for kids, with 💛.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
