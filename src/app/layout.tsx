import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta"
});

export const metadata: Metadata = {
  title: "Exoset - Expérience IT",
  description: "Avec plus de 40 ans d'expérience dans le domaine des technologies de l'information, Exoset se distingue par son savoir-faire et son agilité pour sa clientèle diversifiée.",
  keywords: "IT, technologie, cloud, virtualisation, sécurité, support, Exoset",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={plusJakartaSans.className}>
        {children}
      </body>
    </html>
  );
}
