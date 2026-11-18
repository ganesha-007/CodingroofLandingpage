import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { CONTACT_EMAIL, Container, Footer, Navbar, useHashScroll } from "@/components/site";

// Website Privacy Policy and Terms of Use. Written to match what this site actually does today:
// no analytics or tracking cookies; demo requests go to hello@codingroof.com via Web3Forms;
// hosted on Google Cloud, DNS/security by Cloudflare, fonts from Google Fonts.
// Product (app) data is governed by each customer's agreement, not by this page.
const UPDATED = "18 November 2026";

const H2 = ({ children }: { children: ReactNode }) => (
  <h2 className="mt-12 text-xl md:text-2xl font-semibold tracking-[-0.015em] text-foreground">{children}</h2>
);
const P = ({ children }: { children: ReactNode }) => (
  <p className="mt-4 text-[15px] md:text-base leading-relaxed text-muted-foreground">{children}</p>
);
const UL = ({ items }: { items: ReactNode[] }) => (
  <ul className="mt-4 list-disc space-y-2 pl-5 text-[15px] md:text-base leading-relaxed text-muted-foreground">
    {items.map((it, i) => (
      <li key={i}>{it}</li>
    ))}
  </ul>
);
const Mail = () => (
  <a href={`mailto:${CONTACT_EMAIL}`} className="font-medium text-primary hover:underline">
    {CONTACT_EMAIL}
  </a>
);

const Shell = ({ title, children }: { title: string; children: ReactNode }) => {
  useHashScroll();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Container className="max-w-3xl py-16 md:py-24">
          <p className="text-sm font-semibold text-primary">Legal</p>
          <h1 className="mt-3 text-4xl md:text-5xl font-semibold tracking-[-0.03em]">{title}</h1>
          <p className="mt-4 text-sm text-muted-foreground">Last updated: {UPDATED}</p>
          {children}
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export const PrivacyPage = () => (
  <Shell title="Privacy Policy">
    <P>
      This policy explains what personal data CodingRoof ("we", "us") collects through this website, codingroof.com,
      why we collect it, and the choices you have. It is written in line with India's Digital Personal Data Protection
      Act, 2023.
    </P>

    <H2>What we collect</H2>
    <P>We only collect what you choose to send us:</P>
    <UL
      items={[
        "Demo requests: your name, work email, and optionally your phone number, the product you're interested in and a short note about your business.",
        "Partner applications and job applications you send by email: the details and documents you include.",
        "Emails you send to us at hello@codingroof.com.",
      ]}
    />
    <P>
      This website does not use analytics, advertising or tracking cookies, and we don't build profiles of visitors.
    </P>

    <H2>How we use it</H2>
    <UL
      items={[
        "To reply to you, arrange a demo and send a quote you asked for.",
        "To assess partner and job applications and contact you about them.",
        "To keep a record of our conversation with you.",
      ]}
    />
    <P>We don't sell your personal data, and we don't use it for unrelated marketing without your consent.</P>

    <H2>Who we share it with</H2>
    <P>We use a small number of service providers to run this website. They process data only to provide their service:</P>
    <UL
      items={[
        "Web3Forms, which delivers demo-request form submissions to our email inbox.",
        "Google Cloud, which hosts this website.",
        "Cloudflare, which provides our domain name service and protects the site from abuse.",
        "Google Fonts, which serves the typeface on this site; your browser connects to Google's servers to load it.",
      ]}
    />
    <P>We may also disclose data where the law requires it.</P>

    <H2>How long we keep it</H2>
    <P>
      We keep enquiry and application details only as long as we need them to respond and follow up, or as required by
      law. You can ask us to delete them at any time.
    </P>

    <H2>Your rights</H2>
    <P>Under the Digital Personal Data Protection Act, 2023, you can:</P>
    <UL
      items={[
        "Ask what personal data we hold about you and how we use it.",
        "Ask us to correct, complete, update or erase it.",
        "Withdraw consent you've given, without affecting anything done before.",
        "Nominate another person to exercise these rights on your behalf.",
        "Raise a grievance with us, and if you're not satisfied, complain to the Data Protection Board of India.",
      ]}
    />
    <P>
      To use any of these rights or raise a concern, email <Mail />. We'll respond as soon as we can.
    </P>

    <H2>Security</H2>
    <P>
      We use reasonable technical and organisational measures to protect personal data, including encrypted (HTTPS)
      connections for this website. No method of transmission over the internet is completely secure.
    </P>

    <H2>Children</H2>
    <P>This website is meant for businesses and is not directed at children under 18.</P>

    <H2>Our products</H2>
    <P>
      This policy covers this website only. Data that customers store in CodingRoof products (such as Gold Loan, Retail
      or FitForge) is handled under the agreement with that customer and each product's own terms.
    </P>

    <H2>Changes to this policy</H2>
    <P>We may update this policy. The date at the top shows when it last changed.</P>

    <H2>Contact</H2>
    <P>
      CodingRoof · <Mail />
    </P>
  </Shell>
);

export const TermsPage = () => (
  <Shell title="Terms of Use">
    <P>
      These terms apply to your use of this website, codingroof.com. By using the site, you agree to them. If you don't
      agree, please don't use the site.
    </P>

    <H2>About this website</H2>
    <P>
      This website gives information about CodingRoof, our products and our services. Using any CodingRoof product is
      governed by a separate agreement and that product's own terms, not by these terms.
    </P>

    <H2>Using the site</H2>
    <P>You agree not to:</P>
    <UL
      items={[
        "Use the site in a way that breaks the law or harms others.",
        "Try to gain unauthorised access to the site, its servers or any connected systems.",
        "Disrupt the site, for example by sending automated requests that overload it, or by introducing malicious code.",
        "Submit false information through our forms.",
      ]}
    />

    <H2>Our content</H2>
    <P>
      The text, design, logos, product names and other content on this site belong to CodingRoof or its licensors. You
      may view and share pages for your own reference, but you may not copy, modify or reuse the content for commercial
      purposes without our written permission.
    </P>

    <H2>Information on the site</H2>
    <P>
      We work to keep the information accurate and current, but the site is provided "as is". Product features,
      availability and examples shown may change and are for general information only; they are not an offer or a
      contract.
    </P>

    <H2>Links to other sites</H2>
    <P>
      The site links to our product websites and to third-party sites. Each has its own terms and privacy policy, and
      we're not responsible for third-party content.
    </P>

    <H2>Limitation of liability</H2>
    <P>
      To the extent permitted by law, CodingRoof is not liable for any indirect or consequential loss arising from your
      use of this website, or from relying on information on it.
    </P>

    <H2>Privacy</H2>
    <P>
      How we handle personal data you send through this site is explained in our{" "}
      <Link to="/privacy" className="font-medium text-primary hover:underline">
        Privacy Policy
      </Link>
      .
    </P>

    <H2>Governing law</H2>
    <P>These terms are governed by the laws of India, and the courts of India have jurisdiction over any dispute.</P>

    <H2>Changes</H2>
    <P>We may update these terms. The date at the top shows when they last changed.</P>

    <H2>Contact</H2>
    <P>
      Questions about these terms? Email <Mail />.
    </P>
  </Shell>
);
