import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/auth/Provider";
import NavBar from "@/app/NavBar";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from "@next/third-parties/google";

const inter = Inter({ subsets: ["latin"] });

const APP_NAME = "Exam Reminders";
const APP_DEFAULT_TITLE = "Exam Reminders";
const APP_TITLE_TEMPLATE = "Exam Reminders";
const APP_DESCRIPTION = "Share your exam dates easily";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    startupImage: "/icon-512x512.png",
  },
  formatDetection: {
    telephone: false,
  },
  authors: { url: "paveegamedev@gmail.com", name: "Patrik Holba" },
  // openGraph: {
  //   type: "website",
  //   siteName: APP_NAME,
  //   title: {
  //     default: APP_DEFAULT_TITLE,
  //     template: APP_TITLE_TEMPLATE,
  //   },
  //   description: APP_DESCRIPTION,
  // },
  // twitter: {
  //   card: "summary",
  //   title: {
  //     default: APP_DEFAULT_TITLE,
  //     template: APP_TITLE_TEMPLATE,
  //   },
  //   description: APP_DESCRIPTION,
  // },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="max-w-full overflow-x-hidden">
      <body className="h-full">
        <AuthProvider>
          <NavBar />
          <main className="mt-5">{children}</main>
          <SpeedInsights />
          <Analytics />
          <GoogleAnalytics gaId={process.env.FIREBASE_MEASUREMENT_ID!} />
        </AuthProvider>
      </body>
    </html>
  );
}
