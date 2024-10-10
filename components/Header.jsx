/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import Cookies from "js-cookie";

// components
import Nav from "./Nav";
import MobileNav from "./MobileNav";

const Header = () => {
  const handleClick = () => {
    if (Cookies.get("skillTag")) {
      Cookies.remove("skillTag");
    }
  };
  return (
    <header className="py-8 xl:py-12 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" onClick={handleClick}>
          <img src="Logo_NBG_Wide.png" alt="logo" className="w-40" />
        </Link>

        {/* Desktop Nav & hire btn */}
        <div className="hidden xl:flex items-center gap-8">
          <Nav />
          <Link href="/contact" onClick={handleClick}>
            <Button className="rounded-full">Hire me</Button>
          </Link>
        </div>
        {/* Mobile nav */}
        <div className="xl:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Header;
