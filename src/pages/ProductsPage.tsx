import { useEffect, type ReactNode } from "react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.webp";

const ACCENT = "#d2603a";
const INK = "#211d18";
const CREAM = "#faf6ee";

interface Product {
  letter: string;
  name: string;
  tag: string;
  desc: string;
  color: string;
}

const products: Product[] = [
  {
    letter: "G",
    name: "Gold Loan",
    tag: "Lending & pawn ops",
    desc: "End-to-end gold loan and pawn-broking operations — valuation, disbursal, interest tracking, renewals and auctions.",
    color: "#e8a13c",
  },
  {
    letter: "S",
    name: "Surgicals",
    tag: "Medical supply chain",
    desc: "Distribution and inventory for surgical and medical supplies — batch tracking, expiry control, billing and reorder.",
    color: "#d2603a",
  },
  {
    letter: "C",
    name: "Cement Depot",
    tag: "Depot management",
    desc: "Run cement and building-material depots with live stock, dispatch, transport and dealer settlement built in.",
    color: "#8aa888",
  },
  {
    letter: "E",
    name: "ERP",
    tag: "Business operations",
    desc: "A modular ERP covering procurement, inventory, sales, accounting and reporting on one connected backbone.",
    color: "#5d7d92",
  },
  {
    letter: "P",
    name: "Printing",
    tag: "Print shop workflows",
    desc: "Quote-to-delivery for print shops — job orders, proofing, production scheduling, costing and invoicing.",
    color: "#9a6db5",
  },
  {
    letter: "T",
    name: "Textile Business",
    tag: "Fabric & orders",
    desc: "Manage fabric, yarn and garment operations — orders, production stages, stock and customer ledgers.",
    color: "#c9a227",
  },
  {
    letter: "B",
    name: "Banking",
    tag: "Core banking systems",
    desc: "Core banking foundations — accounts, deposits, loans, transactions and compliance-ready reporting.",
    color: "#2f7d86",
  },
];

interface Helper {
  name: string;
  tag: string;
  desc: string;
  bg: string;
  icon: ReactNode;
}

const helpers: Helper[] = [
  {
    name: "Sentiment Analysis",
    tag: "For staff & customers",
    desc: "Read the mood across reviews, tickets and chats so teams act before small issues become churn.",
    bg: "#fbe9d9",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M12 3c-3 3.5-5 7-5 10a5 5 0 0 0 10 0c0-3-2-6.5-5-10Z" stroke="#d2603a" strokeWidth="2" strokeLinejoin="round" />
        <path d="M9.5 14.5h5" stroke="#d2603a" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "Chat Bot",
    tag: "Instant support & answers",
    desc: "Always-on assistant that answers customers and staff using your own product data and docs.",
    bg: "#fbe9d9",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M4 5h16v11H9l-4 4V5Z" stroke="#d2603a" strokeWidth="2" strokeLinejoin="round" />
        <circle cx="9.5" cy="10.5" r="1.1" fill="#d2603a" />
        <circle cx="14.5" cy="10.5" r="1.1" fill="#d2603a" />
      </svg>
    ),
  },
  {
    name: "Personalised Stock Prediction",
    tag: "Demand & inventory forecasts",
    desc: "Forecast demand per item and location to keep the right stock without tying up working capital.",
    bg: "#e7f0e6",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M4 18V6M8 16V10M12 16V4M16 16v-6M20 16V8" stroke="#3f7a44" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "Customer Risk Prediction",
    tag: "Loan reimbursement scoring",
    desc: "Score borrowers on repayment risk using behaviour and history to lend with confidence.",
    bg: "#eef1f3",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M12 3 14 9 20 11 14 13 12 19 10 13 4 11 10 9Z" stroke="#5d7d92" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "OCR Billing",
    tag: "Scan invoices into bills",
    desc: "Snap or upload an invoice and turn it into a structured bill — no manual data entry.",
    bg: "#fdf1d9",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M5 4h11l3 3v13H5z" stroke="#b9851f" strokeWidth="2" strokeLinejoin="round" />
        <path d="M8.5 9.5h7M8.5 13h4" stroke="#b9851f" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "Voice to Billing",
    tag: "Speech to invoice entries",
    desc: "Speak line items aloud and watch them become invoice entries — perfect for busy counters.",
    bg: "#eaf1f5",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M12 3a3 3 0 0 0-3 3v4a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3Z" stroke="#5d7d92" strokeWidth="2" />
        <path d="M6 10v1a6 6 0 0 0 12 0v-1M12 17v4M8 21h8" stroke="#5d7d92" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
];

const ProductsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: CREAM, color: INK, fontFamily: "'Hanken Grotesk', sans-serif" }}>
      {/* Header */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(250,246,238,0.85)",
          backdropFilter: "blur(8px)",
          borderBottom: "1px solid #efe9de",
        }}
      >
        <div
          style={{
            maxWidth: 1180,
            margin: "0 auto",
            padding: "0 24px",
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", color: INK }}>
            <img src={logo} alt="CodingRoof" style={{ height: 30, width: "auto", objectFit: "contain" }} />
            <span style={{ fontWeight: 600, letterSpacing: "-0.02em" }}>CodingRoof</span>
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <Link
              to="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: 14,
                fontWeight: 600,
                color: "#6b6256",
                textDecoration: "none",
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path d="M19 12H5M11 6l-6 6 6 6" stroke="#6b6256" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back to home
            </Link>
            <Link
              to="/login"
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "9px 16px",
                borderRadius: 10,
                background: INK,
                color: "#fff",
                fontSize: 14,
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              Book a call
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section style={{ position: "relative", borderBottom: "1px solid #efe9de" }}>
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "radial-gradient(rgba(33,29,24,0.04) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div style={{ position: "relative", maxWidth: 1180, margin: "0 auto", padding: "72px 24px 56px" }}>
          <p
            style={{
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: ACCENT,
              margin: "0 0 14px",
            }}
          >
            The full catalog
          </p>
          <h1
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(2.2rem,5vw,3.6rem)",
              lineHeight: 1.03,
              letterSpacing: "-0.04em",
              margin: 0,
              maxWidth: "14em",
            }}
          >
            Every product and AI helper, in one place.
          </h1>
          <p style={{ margin: "20px 0 0", maxWidth: "40em", fontSize: 17, lineHeight: 1.6, color: "#6b6256" }}>
            Industry-grade software your team can run from day one — paired with AI helpers that plug straight into your
            workflows. Built on one platform, one login, one source of truth.
          </p>
          <div style={{ marginTop: 28, display: "flex", flexWrap: "wrap", gap: 20 }}>
            <Stat value="7" label="Production products" />
            <Divider />
            <Stat value="6" label="AI helpers" />
            <Divider />
            <Stat value="1" label="Connected platform" />
          </div>
        </div>
      </section>

      {/* Products */}
      <section style={{ maxWidth: 1180, margin: "0 auto", padding: "64px 24px 16px" }}>
        <SectionHeading
          eyebrow="Products"
          title="Software for real industries"
          desc="Each product is a complete, production-grade system — not a template. Pick one, or run several on the same backbone."
        />
        <div
          style={{
            marginTop: 40,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: 20,
          }}
        >
          {products.map((p) => (
            <ProductCard key={p.name} product={p} />
          ))}
        </div>
      </section>

      {/* AI Helpers */}
      <section style={{ maxWidth: 1180, margin: "0 auto", padding: "56px 24px 16px" }}>
        <SectionHeading
          eyebrow="AI Helpers"
          title="Autonomous helpers, wired into your stack"
          desc="Lightweight AI layers that sit on top of your products — automating the busywork and surfacing the signal."
        />
        <div
          style={{
            marginTop: 40,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: 20,
          }}
        >
          {helpers.map((h) => (
            <HelperCard key={h.name} helper={h} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ maxWidth: 1180, margin: "0 auto", padding: "64px 24px 88px" }}>
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            border: `2.5px solid ${INK}`,
            borderRadius: 24,
            boxShadow: `7px 7px 0 ${INK}`,
            background: "linear-gradient(160deg,#2a2520 0%, #3a2e26 60%, #4a2f23 100%)",
            padding: "48px 40px",
            textAlign: "center",
          }}
        >
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
              backgroundSize: "30px 30px",
              WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black, transparent 75%)",
              maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black, transparent 75%)",
            }}
          />
          <div style={{ position: "relative" }}>
            <h2
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(1.8rem,3.5vw,2.6rem)",
                letterSpacing: "-0.03em",
                color: "#fff",
                margin: 0,
                lineHeight: 1.08,
              }}
            >
              Not sure which fits your business?
            </h2>
            <p style={{ margin: "16px auto 0", maxWidth: "34em", fontSize: 16, lineHeight: 1.6, color: "#d9cfc2" }}>
              Tell us what you run and we'll map the right products and AI helpers to your workflows — with a timeline and
              an ROI projection.
            </p>
            <div style={{ marginTop: 28, display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
              <Link
                to="/login"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "13px 24px",
                  borderRadius: 12,
                  background: ACCENT,
                  border: "2px solid #fff3",
                  color: "#fff",
                  fontSize: 15,
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                Book a call
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link
                to="/"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "13px 24px",
                  borderRadius: 12,
                  border: "2px solid #fff",
                  color: "#fff",
                  fontSize: 15,
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                Back to home
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            marginTop: 56,
            paddingTop: 24,
            borderTop: "1px solid #e7e1d6",
            display: "flex",
            flexWrap: "wrap",
            gap: 16,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <img src={logo} alt="CodingRoof" style={{ height: 26, width: "auto", objectFit: "contain" }} />
            <span style={{ fontWeight: 600, fontSize: 14, letterSpacing: "-0.02em" }}>CodingRoof</span>
          </div>
          <span style={{ fontSize: 12, color: "#9a9182" }}>© {new Date().getFullYear()} CodingRoof</span>
        </div>
      </section>
    </div>
  );
};

const Stat = ({ value, label }: { value: string; label: string }) => (
  <div>
    <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 26, letterSpacing: "-0.03em" }}>
      {value}
    </div>
    <div style={{ fontSize: 13, color: "#6b6256", marginTop: 2 }}>{label}</div>
  </div>
);

const Divider = () => <div aria-hidden style={{ width: 1, alignSelf: "stretch", background: "#e0d8c9" }} />;

const SectionHeading = ({ eyebrow, title, desc }: { eyebrow: string; title: string; desc: string }) => (
  <div style={{ maxWidth: "44em" }}>
    <p
      style={{
        fontSize: 12.5,
        fontWeight: 700,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: ACCENT,
        margin: "0 0 12px",
      }}
    >
      {eyebrow}
    </p>
    <h2
      style={{
        fontFamily: "'Bricolage Grotesque', sans-serif",
        fontWeight: 800,
        fontSize: "clamp(1.6rem,3vw,2.2rem)",
        letterSpacing: "-0.035em",
        lineHeight: 1.08,
        margin: 0,
      }}
    >
      {title}
    </h2>
    <p style={{ margin: "12px 0 0", fontSize: 16, lineHeight: 1.6, color: "#6b6256" }}>{desc}</p>
  </div>
);

const ProductCard = ({ product }: { product: Product }) => (
  <div
    style={{
      position: "relative",
      display: "flex",
      flexDirection: "column",
      background: "#fff",
      border: `2px solid ${INK}`,
      borderRadius: 18,
      padding: "22px 22px 20px",
      boxShadow: `4px 4px 0 ${INK}`,
      transition: "transform .18s ease, box-shadow .18s ease",
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.transform = "translate(-2px,-2px)";
      e.currentTarget.style.boxShadow = `6px 6px 0 ${INK}`;
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.transform = "none";
      e.currentTarget.style.boxShadow = `4px 4px 0 ${INK}`;
    }}
  >
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
      <span
        style={{
          width: 46,
          height: 46,
          borderRadius: 13,
          background: product.color,
          color: "#fff",
          border: `1.5px solid ${INK}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Bricolage Grotesque', sans-serif",
          fontWeight: 800,
          fontSize: 20,
        }}
      >
        {product.letter}
      </span>
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 5,
          fontSize: 11,
          fontWeight: 700,
          color: "#3f7a44",
          border: "1.5px solid #cfe0cd",
          background: "#eef5ec",
          borderRadius: 99,
          padding: "3px 9px",
        }}
      >
        <span style={{ width: 6, height: 6, borderRadius: 99, background: "#3f7a44" }} />
        Live
      </span>
    </div>
    <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 20, letterSpacing: "-0.02em", margin: 0 }}>
      {product.name}
    </h3>
    <p style={{ margin: "3px 0 0", fontSize: 12.5, fontWeight: 600, color: ACCENT }}>{product.tag}</p>
    <p style={{ margin: "12px 0 0", fontSize: 14, lineHeight: 1.55, color: "#6b6256" }}>{product.desc}</p>
  </div>
);

const HelperCard = ({ helper }: { helper: Helper }) => (
  <div
    style={{
      position: "relative",
      display: "flex",
      flexDirection: "column",
      background: "#fff",
      border: "1px solid #e7e1d6",
      borderRadius: 18,
      padding: "22px 22px 20px",
      transition: "border-color .18s ease, transform .18s ease",
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.borderColor = INK;
      e.currentTarget.style.transform = "translateY(-2px)";
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.borderColor = "#e7e1d6";
      e.currentTarget.style.transform = "none";
    }}
  >
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
      <span
        style={{
          width: 46,
          height: 46,
          borderRadius: 13,
          background: helper.bg,
          border: `1.5px solid ${INK}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {helper.icon}
      </span>
      <span
        style={{
          fontSize: 10.5,
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "#9a9182",
          border: "1px solid #ece6da",
          borderRadius: 99,
          padding: "3px 9px",
        }}
      >
        AI
      </span>
    </div>
    <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 19, letterSpacing: "-0.02em", margin: 0, lineHeight: 1.2 }}>
      {helper.name}
    </h3>
    <p style={{ margin: "3px 0 0", fontSize: 12.5, fontWeight: 600, color: ACCENT }}>{helper.tag}</p>
    <p style={{ margin: "12px 0 0", fontSize: 14, lineHeight: 1.55, color: "#6b6256" }}>{helper.desc}</p>
  </div>
);

export default ProductsPage;
