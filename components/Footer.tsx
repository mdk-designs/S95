import Image from "next/image";
import Link from "next/link";
import { nav, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="site-footer on-dark">
      <div className="container">
        <div className="footer__top">
          <div>
            <Link href="/" className="footer__logo" aria-label={`${site.name} — home`}>
              <Image src="/logo.png" alt="" width={747} height={544} />
            </Link>
            <p className="footer__cta">Delivering spaces that enable people and businesses to thrive.</p>
          </div>

          <nav aria-labelledby="footer-nav">
            <h2 id="footer-nav" className="footer__heading">
              Explore
            </h2>
            <ul className="footer__list">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
              <li>
                <Link href="/blog">Journal</Link>
              </li>
            </ul>
          </nav>

          <div>
            <h2 className="footer__heading">Start a project</h2>
            <p>
              Project enquiries and collaborations
              <br />
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </p>
            <p>
              <Link href="/contact-us">Send us a message</Link>
            </p>
          </div>
        </div>

        <div className="footer__bottom">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>
            <a href="#main">Back to top</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
