import { ContactForm } from "@/components/ContactForm";
import { PageIntro } from "@/components/PageIntro";
import { Reveal } from "@/components/Reveal";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta({
  title: "Contact Us",
  description: "Get in touch with S95 Creative Solutions for project enquiries and collaborations.",
  path: "/contact-us",
});

export default function ContactPage() {
  return (
    <>
      <PageIntro eyebrow="Get in touch" title="Contact Us">
        <p>
          Would you like to get to know more about us or our services? We’d love to hear from you. Contact us for project enquiries and
          collaborations.
        </p>
      </PageIntro>

      <section className="section" style={{ paddingTop: "clamp(1rem, 3vw, 3rem)" }} aria-label="Contact form and details">
        <div className="container split split--top split--wide-left">
          <Reveal>
            <ContactForm />
          </Reveal>
          <Reveal delay={150}>
            <dl className="contact-details" style={{ marginTop: 0 }}>
              <dt style={{ marginTop: 0 }}>Email</dt>
              <dd>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </dd>
              <dt>Founder</dt>
              <dd>{site.founder}</dd>
            </dl>
          </Reveal>
        </div>
      </section>
    </>
  );
}
