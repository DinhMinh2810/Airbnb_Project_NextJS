import ClientJust from "./components/ClientJust";
import RegisterModal from "./components/modal/RegisterModal";
import Navbar from "./components/navbar/Navbar";
import "./globals.css";
import { Nunito } from "next/font/google";
import ToasterProvider from "@/app/providers/ToasterProvider";

const inter = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: "Airbnb",
  description: "Airbnb app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientJust>
          <ToasterProvider />
          <RegisterModal />
          <Navbar />
        </ClientJust>

        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}
