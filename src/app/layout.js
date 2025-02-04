import { Urbanist, Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";

// Font configurations
const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
});

// Metadata for SEO
export const metadata = {
  title: "SensAi - AI Career Coach",
  description: "A modern web application built with Next.js",
  keywords: ["Next.js", "React", "JavaScript", "Web Development"],
  authors: [{ name: "Shiva Sajay", url: "https://yourwebsite.com" }],
  themeColor: "#000000",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${urbanist.variable} ${poppins.variable} font-urbanist antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <main className="min-h-screen">{children}</main>
            <footer className="py-4 text-center">
              <p>Made with ❤️‍🔥 by Shiva Sajay</p>
            </footer>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
