import { ReactNode } from "react";
import './globals.css';
import RootClientLayout from "../components/RootClientLayout";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <RootClientLayout>{children}</RootClientLayout>
      </body>
    </html>
  );
}
