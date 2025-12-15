import { Outlet } from "react-router-dom";

import Footer from "../components/Footer";
import Header from "../components/Header";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-soft-gradient text-dark">
      <Header />
      <main className="max-w-7xl mx-auto px-6 py-12">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
