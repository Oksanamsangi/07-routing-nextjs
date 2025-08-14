import Style from './Footer.module.css';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className={Style.footer}>
      <div className={Style.content}>
        <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
        <div className={Style.wrap}>
          <p>Developer: Oksana Sydorenko</p>
          <p>
            Contact us:
            <Link href="<mailto:student@notehub.app>"></Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
