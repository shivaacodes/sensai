import { Geist, Geist_Mono, Poppins, Urbanist } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

// Font configurations
const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // Adjust as needed
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
});

// Metadata for SEO
export const metadata = {
  title: "Next.js App",
  description: "A modern web application built with Next.js",
  keywords: ["Next.js", "React", "JavaScript", "Web Development"],
  authors: [{ name: "Shiva Sajay", url: "https://yourwebsite.com" }],
  themeColor: "#000000",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${urbanist.variable} ${geistSans.variable} ${geistMono.variable} ${poppins.variable} font-urbanist antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {/* Main Content */}
          <main className="min-h-screen">{children}</main>

          {/* Footer */}
          <footer className="py-4 text-center">
            <p>Made with love by Shiva</p>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
