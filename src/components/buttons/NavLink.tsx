"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  const path = usePathname();
  return (
    <Link
      className={`${path.startsWith(href) && "text-primary font-bold"}`}
      href={href}
    >
      {children}
    </Link>
  );
};

export default NavLink;
