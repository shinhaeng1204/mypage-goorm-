import { useState } from "react";

import Footer from "./Footer";
import Header from "./Header";
import SideBar from "./SideBar";

export default function Layout({ children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen flex">
      <SideBar open={open} onClose={() => setOpen(false)} />
      <div className="flex-1 flex flex-col">
        <Header onMenu={() => setOpen((v) => !v)} />
        <main className="flex-1 p-6">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
