import "./globals.css";

export const metadata = {
  title: "Herzsprache® by Britta Marbs",
  description: "Business Coaching, Teamentwicklung und Herzsprache® mit Britta Marbs.",
  icons: {
    icon: "/img/favicon/favicon.ico",
    apple: "/img/favicon/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="de" dir="ltr">
      <head>
        <link rel="stylesheet" href="/css/loader.css" />
        <link rel="stylesheet" href="/css/plugins.css" />
        <link rel="stylesheet" href="/css/main.css" />
        <link
          rel="preload"
          href="/fonts/Phosphor/Phosphor.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: light)"
          content="#EEEAE8"
        />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: dark)"
          content="#0f0f0f"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
