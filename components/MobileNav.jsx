/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { CiMenuFries } from "react-icons/ci";
import Cookies from "js-cookie";

const links = [
  {
    name: "home",
    path: "/",
  },
  {
    name: "projects",
    path: "/projects",
  },
  {
    name: "skills",
    path: "/skills",
  },
  {
    name: "resume",
    path: "/resume",
  },
  {
    name: "contact",
    path: "/contact",
  },
];

const MobileNav = () => {
  const pathname = usePathname();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // Function to close the sheet when a link is clicked
  const closeSheet = () => {
    setIsSheetOpen(false);
    if (Cookies.get("skillTag")) {
      Cookies.remove("skillTag");
    }
  };

  return (
    <Sheet
      open={isSheetOpen}
      onOpenChange={(open) => setIsSheetOpen(open)}
      className="flex justify-center items-center"
    >
      <SheetTrigger asChild>
        <button onClick={() => setIsSheetOpen(true)}>
          <CiMenuFries className="text-[32px] text-accent" />
        </button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <div className="mt-32 mb-14 mx-auto">
          <Link href="/" onClick={closeSheet}>
            <img src="Logo_NBG_Wide.png" className="w-40" alt="logo_sm" />
          </Link>
        </div>
        <nav className="flex flex-col justify-center items-center gap-8">
          {links.map((link, index) => (
            <Link
              href={link.path}
              key={index}
              onClick={closeSheet} // Close sheet on link click
              className={`${
                link.path === pathname && "text-accent border-b-2 border-accent"
              }  text-xl capitalize hover:text-accent transition-all`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
