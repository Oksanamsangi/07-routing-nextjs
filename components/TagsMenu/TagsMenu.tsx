"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { MENU_TAG_OPTIONS } from "@/lib/constants";
import Style from "./TagsMenu.module.css";

export default function TagsMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, closeMenu]);

  return (
    <div ref={menuRef} className={Style.menuContainer}>
      <button
        onClick={toggleMenu}
        className={Style.menuButton}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label="Toggle Notes menu"
      >
        Notes ▾
      </button>

      {isOpen && (
        <ul className={Style.menuList} role="menu">
          {MENU_TAG_OPTIONS.map((tag) => (
            <li key={tag} className={Style.menuItem} role="none">
              <Link
                onClick={toggleMenu}
                href={`/notes/filter/${tag}`}
                className={Style.menuLink}
                role="menuitem"
              >
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
