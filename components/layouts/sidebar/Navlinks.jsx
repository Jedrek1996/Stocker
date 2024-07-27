"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { links } from "@/data/links";
import { generateUUID } from "@/utils/uuid";

const Navlinks = () => {
  const currentPath = usePathname();

  return (
    <div className="menu text-base-content">
      {links.map((link) => {
        const isActive = currentPath === link.href;
        return (
          <li key={generateUUID()}>
            <Link
              href={link.href}
              className={`capitalize ${isActive ? "active" : ""}`}
            >
              {link.label}
            </Link>
          </li>
        );
      })}
    </div>
  );
};

export default Navlinks;
