"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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

const Nav = () => {
  const pathname = usePathname();
  const handleClick = () => {
    if (Cookies.get("skillTag")) {
      Cookies.remove("skillTag");
    }
  };
  return (
    <nav className="flex gap-8">
      {links.map((link, index) => {
        return (
          <Link
            onClick={handleClick}
            href={link.path}
            key={index}
            className={`${
              link.path === pathname && "text-accent border-b-2 border-accent"
            } capitalize font-medium hover:text-accent transition-all`}
          >
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
};

export default Nav;
