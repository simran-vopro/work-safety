// src/layouts/MainLayout.tsx
import type { ReactNode } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => (
  <div className="min-h-screen">
    <Header />
    <main className="flex-grow mx-auto relative">
      {children}
    </main>
    <Footer />
  </div>
);

export default MainLayout;
