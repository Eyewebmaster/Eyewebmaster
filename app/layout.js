// layout.js (Remains a Server Component)
import { Outfit, Ovo } from "next/font/google";
import "./globals.css";
import ClientLayoutWrapper from "./components/ClientLayoutWrapper"; // <--- Import your new wrapper

const outfit = Outfit({
  subsets: ["latin"], weight: ["400", "500", "600", "700"]
});

const ovo = Ovo({
  subsets: ["latin"], weight: ["400"]
});

export const metadata = {
  title: "Eyewebmaster Artisan",
  description: "The new way of Web Development",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${outfit.className} ${ovo.className} antialiased leading-8 overflow-x-hidden`} >
        {/* Use the ClientLayoutWrapper here */}
        <ClientLayoutWrapper>
          {children} {/* This will pass your page content (e.g., from app/page.jsx) to the wrapper */}
        </ClientLayoutWrapper>
      </body>
    </html>
  );
}