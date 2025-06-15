import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

export default function Layout() {
  return (
    <>
      <Navbar />

      <main className="min-h-[80vh] px-4">
        <Outlet /> {/* 🔥 This is the key */}
      </main>

      <Footer />
    </>
  );
}
