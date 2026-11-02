import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";

export default function NotFound() {
  return (
    <>
      <PageIntro eyebrow="404" title="This page could not be found.">
        <p>The page may have moved. Try the links below.</p>
      </PageIntro>
      <div className="container section" style={{ paddingTop: 0 }}>
        <div className="actions" style={{ marginTop: 0 }}>
          <Link href="/" className="btn">
            Back to home
          </Link>
          <Link href="/contact-us" className="link-arrow">
            Contact us <span aria-hidden="true" />
          </Link>
        </div>
      </div>
    </>
  );
}
