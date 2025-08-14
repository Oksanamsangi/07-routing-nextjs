import Link from "next/link";
import TagsMenu from "../TagsMenu/TagsMenu";
import Style from "./Header.module.css";

export default function Header() {
  return (
    <header className={Style.header}>
      <Link href="/" className={Style.headerLink} aria-label="Home">
        NoteHub
      </Link>
      <nav role="navigation" aria-label="Main Navigation">
        <ul className={Style.navigation}>
          <li className={Style.navigationItem}>
            <Link className={Style.navigationLink} href="/">
              Home
            </Link>
          </li>
          <li className={Style.navigationItem}>
            <TagsMenu />
          </li>
        </ul>
      </nav>
    </header>
  );
}
