import "./globals.css";
import ReduxProvider from "@/providers/ReduxProvider";


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}