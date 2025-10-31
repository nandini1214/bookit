import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F9F9F9]">
      {/* Navbar always visible */}
      <Navbar />

      {/* Main dynamic content */}
      <main className="flex-1 px-[124px] py-[16px]">
        <Outlet />
      </main>
    </div>
  );
}
