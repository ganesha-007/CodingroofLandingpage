// Hero product showcase: product tabs that auto-rotate through realistic UI previews.
// All figures are illustrative sample data, built in code (no screenshots).
import { ShieldCheck, ScanLine } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { productBySlug } from "@/data/products";

const ROTATE_MS = 6000;

// ---------- small UI atoms ----------
const avatarColors = ["bg-sky-100 text-sky-700", "bg-amber-100 text-amber-700", "bg-emerald-100 text-emerald-700", "bg-rose-100 text-rose-700", "bg-violet-100 text-violet-700"];
const Avatar = ({ name, i = 0 }: { name: string; i?: number }) => (
  <span className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[9px] font-semibold ${avatarColors[i % avatarColors.length]}`}>
    {name.split(" ").map((w) => w[0]).join("")}
  </span>
);

const Pill = ({ tone, children }: { tone: "green" | "amber" | "slate" | "blue"; children: ReactNode }) => {
  const t = {
    green: "bg-emerald-50 text-emerald-700",
    amber: "bg-amber-50 text-amber-700",
    slate: "bg-slate-100 text-slate-600",
    blue: "bg-accent text-accent-foreground",
  }[tone];
  return <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10.5px] font-medium ${t}`}>{children}</span>;
};

const ScreenHeader = ({ slug, title, sub, right }: { slug: string; title: string; sub: string; right?: ReactNode }) => (
  <div className="flex items-center justify-between gap-4">
    <div className="flex items-center gap-3">
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-white">
        <img src={productBySlug[slug].logo} alt="" className="h-5 w-5 object-contain" />
      </span>
      <div>
        <p className="text-sm font-semibold leading-tight">{title}</p>
        <p className="text-[11.5px] text-muted-foreground">{sub}</p>
      </div>
    </div>
    {right}
  </div>
);

const Kpi = ({ k, v, delta }: { k: string; v: string; delta?: string }) => (
  <div className="rounded-lg border border-border bg-white p-3">
    <p className="text-[11px] text-muted-foreground">{k}</p>
    <p className="mt-1 flex items-baseline gap-1.5 text-lg font-semibold tracking-tight">
      {v}
      {delta && <span className="text-[10.5px] font-medium text-emerald-600">{delta}</span>}
    </p>
  </div>
);

// ---------- product screens ----------
const pipeline = [
  { stage: "New lead", deals: [["Sri Balaji Traders", "₹1.2 L", "Anu R"], ["Kaveri Textiles", "₹3.4 L", "Vikram S"], ["Metro Pharma", "₹85 K", "Anu R"]] },
  { stage: "Qualified", deals: [["Lakshmi Jewellers", "₹2.6 L", "Divya M"], ["BlueLine Logistics", "₹4.1 L", "Vikram S"]] },
  { stage: "Proposal", deals: [["Sunrise Hospital", "₹6.8 L", "Divya M"], ["Apex Prints", "₹1.9 L", "Anu R"]] },
  { stage: "Won", deals: [["Green Valley Mart", "₹2.4 L", "Karthik P"], ["Nova Salon", "₹78 K", "Divya M"]] },
];

const FunnelloScreen = () => (
  <div className="flex h-full flex-col">
    <ScreenHeader slug="funnello" title="Sales pipeline" sub="This month · All owners" right={<Pill tone="blue">₹24.1 L open</Pill>} />
    <div className="mt-4 grid flex-1 grid-cols-2 gap-2.5 md:grid-cols-4">
      {pipeline.map((col, ci) => (
        <div key={col.stage} className={`flex flex-col rounded-lg bg-muted/70 p-2 ${ci > 1 ? "hidden md:flex" : ""}`}>
          <div className="flex items-center justify-between px-1 pb-2 text-[11px] font-medium text-muted-foreground">
            {col.stage}
            <span className="rounded bg-white px-1.5 text-[10px]">{col.deals.length}</span>
          </div>
          <div className="space-y-2">
            {col.deals.map(([name, value, owner], i) => (
              <div key={name} className="rounded-md border border-border bg-white p-2.5 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
                <p className="truncate text-[12px] font-medium">{name}</p>
                <div className="mt-1.5 flex items-center justify-between">
                  <span className="text-[11.5px] font-semibold">{value}</span>
                  <Avatar name={owner} i={i + ci} />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const board = [
  { col: "To do", items: [["VEC-142", "Set up GST invoice templates", "Billing"], ["VEC-139", "Branch-wise access roles", "Admin"]] },
  { col: "In progress", items: [["VEC-131", "Auction reminder SMS flow", "Gold Loan"], ["VEC-128", "Stock transfer between stores", "Retail"]] },
  { col: "In review", items: [["VEC-125", "Monthly P&L export", "ERP"]] },
  { col: "Done", items: [["VEC-120", "Technician check-in by GPS", "Field"], ["VEC-117", "Lead import from CSV", "CRM"]] },
];
const owners = ["Anu R", "Vikram S", "Divya M", "Karthik P"];

const VectorScreen = () => (
  <div className="flex h-full flex-col">
    <ScreenHeader
      slug="vector"
      title="Platform roadmap · Sprint 14"
      sub="9 issues · ends Friday"
      right={
        <span className="flex -space-x-1.5">
          {owners.map((o, i) => (
            <span key={o} className="rounded-full ring-2 ring-white">
              <Avatar name={o} i={i} />
            </span>
          ))}
        </span>
      }
    />
    <div className="mt-4 grid flex-1 grid-cols-2 gap-2.5 md:grid-cols-4">
      {board.map((c, ci) => (
        <div key={c.col} className={`rounded-lg border border-dashed border-border p-2 ${ci > 1 ? "hidden md:block" : ""}`}>
          <p className="px-1 pb-2 text-[11px] font-medium text-muted-foreground">{c.col}</p>
          <div className="space-y-2">
            {c.items.map(([key, title, tag], i) => (
              <div key={key} className="rounded-md border border-border bg-white p-2.5">
                <p className="text-[12px] font-medium leading-snug">{title}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="font-mono text-[10px] text-muted-foreground">{key}</span>
                  <span className="flex items-center gap-1.5">
                    <Pill tone={c.col === "Done" ? "green" : "slate"}>{tag}</Pill>
                    <Avatar name={owners[(i + ci) % owners.length]} i={i + ci} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const loans = [
  ["GL-1042", "R. Kumar", "24.5 g", "₹1,20,000", "Active"],
  ["GL-1041", "S. Priya", "12.0 g", "₹58,500", "Renewal due"],
  ["GL-1040", "M. Joseph", "40.2 g", "₹1,96,000", "Active"],
  ["GL-1039", "A. Fathima", "8.8 g", "₹42,000", "Closed"],
];

const GoldLoanScreen = () => (
  <div className="flex h-full flex-col">
    <ScreenHeader slug="gold-loan" title="Branch overview" sub="Anna Nagar branch · Today" right={<Pill tone="green">Gold rate ₹7,240/g</Pill>} />
    <div className="mt-4 grid grid-cols-3 gap-2.5">
      <Kpi k="Active loans" v="1,284" delta="+12" />
      <Kpi k="Gold pledged" v="18.6 kg" />
      <Kpi k="Interest due" v="₹3.4 L" />
    </div>
    <div className="mt-3 flex-1 overflow-hidden rounded-lg border border-border bg-white">
      <div className="grid grid-cols-[1fr_1fr_auto] gap-3 bg-muted/60 px-3 py-2 text-[11px] font-medium text-muted-foreground md:grid-cols-[80px_1fr_70px_1fr_auto]">
        <span className="hidden md:block">Loan</span><span>Customer</span><span className="hidden md:block">Weight</span><span>Amount</span><span>Status</span>
      </div>
      {loans.map(([id, name, w, amt, status]) => (
        <div key={id} className="grid grid-cols-[1fr_1fr_auto] items-center gap-3 border-t border-border px-3 py-2.5 text-[12px] md:grid-cols-[80px_1fr_70px_1fr_auto]">
          <span className="hidden font-mono text-[11px] text-muted-foreground md:block">{id}</span>
          <span className="font-medium">{name}</span>
          <span className="hidden text-muted-foreground md:block">{w}</span>
          <span>{amt}</span>
          <Pill tone={status === "Active" ? "green" : status === "Closed" ? "slate" : "amber"}>{status}</Pill>
        </div>
      ))}
    </div>
  </div>
);

const sales = [42, 55, 48, 63, 58, 71, 66, 80, 74, 88, 82, 95];
const months = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

const ErpScreen = () => (
  <div className="flex h-full flex-col">
    <ScreenHeader slug="erp" title="Business overview" sub="FY 2026 · All locations" right={<Pill tone="blue">Synced 2 min ago</Pill>} />
    <div className="mt-4 grid flex-1 gap-2.5 md:grid-cols-5">
      <div className="flex flex-col rounded-lg border border-border bg-white p-3 md:col-span-3">
        <div className="flex items-baseline justify-between">
          <p className="text-[11px] text-muted-foreground">Monthly sales</p>
          <p className="text-sm font-semibold">₹1.42 Cr <span className="text-[10.5px] font-medium text-emerald-600">+18%</span></p>
        </div>
        <div className="mt-3 flex h-[170px] items-end gap-1.5 md:h-[250px]">
          {sales.map((v, i) => (
            <div key={i} className="flex h-full flex-1 flex-col items-center justify-end gap-1">
              <div className={`w-full rounded-sm ${i === sales.length - 1 ? "bg-primary" : "bg-primary/25"}`} style={{ height: `${v * 0.88}%` }} />
              <span className="text-[9px] text-muted-foreground">{months[i]}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="hidden rounded-lg border border-border bg-white p-3 md:col-span-2 md:block">
        <p className="text-[11px] text-muted-foreground">Low stock</p>
        <ul className="mt-2 space-y-2.5 text-[12px]">
          {[["Cotton yarn 40s", "12 kg"], ["Packing tape", "8 rolls"], ["A4 paper 75gsm", "4 boxes"], ["Barcode labels", "2 rolls"]].map(([n, q]) => (
            <li key={n} className="flex items-center justify-between gap-2">
              <span className="truncate">{n}</span>
              <Pill tone="amber">{q}</Pill>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

const cart = [["Basmati rice 5 kg", 1, 649], ["Sunflower oil 1 L", 2, 165], ["Toor dal 1 kg", 1, 148], ["Tea powder 500 g", 1, 260]] as const;

const RetailScreen = () => {
  const total = cart.reduce((s, [, q, p]) => s + q * p, 0);
  return (
    <div className="flex h-full flex-col">
      <ScreenHeader slug="retail" title="Counter 2 · New bill" sub="Green Valley Mart" right={<Pill tone="slate">Cashier: Meena</Pill>} />
      <div className="mt-4 grid flex-1 gap-2.5 md:grid-cols-5">
        <div className="overflow-hidden rounded-lg border border-border bg-white md:col-span-3">
          {cart.map(([n, q, p]) => (
            <div key={n} className="flex items-center justify-between gap-3 border-b border-border px-3 py-2.5 text-[12px] last:border-0">
              <span className="truncate font-medium">{n}</span>
              <span className="flex shrink-0 items-center gap-4 text-muted-foreground">
                <span>× {q}</span>
                <span className="w-14 text-right text-foreground">₹{q * p}</span>
              </span>
            </div>
          ))}
        </div>
        <div className="flex flex-col justify-between rounded-lg border border-border bg-muted/60 p-3 md:col-span-2">
          <div className="space-y-1.5 text-[12px]">
            <div className="flex justify-between text-muted-foreground"><span>Items</span><span>5</span></div>
            <div className="flex justify-between text-muted-foreground"><span>GST included</span><span>₹71</span></div>
            <div className="flex justify-between border-t border-border pt-2 text-base font-semibold"><span>Total</span><span>₹{total}</span></div>
          </div>
          <span className="mt-3 inline-flex h-9 items-center justify-center rounded-md bg-primary text-[12.5px] font-medium text-primary-foreground">
            Collect payment
          </span>
        </div>
      </div>
    </div>
  );
};

const tabs = [
  { slug: "funnello", label: "Funnello", url: "funnello.codingroof.com/pipeline", Screen: FunnelloScreen },
  { slug: "vector", label: "Vector", url: "vector.codingroof.com/board", Screen: VectorScreen },
  { slug: "gold-loan", label: "Gold Loan", url: "app.codingroof.com/gold-loan", Screen: GoldLoanScreen },
  { slug: "erp", label: "ERP", url: "app.codingroof.com/erp", Screen: ErpScreen },
  { slug: "retail", label: "Retail", url: "app.codingroof.com/retail", Screen: RetailScreen },
];

// ---------- showcase ----------
export const HeroShowcase = () => {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [picked, setPicked] = useState(false); // a manual pick stops auto-rotation

  useEffect(() => {
    if (reduce || paused || picked) return;
    const t = window.setTimeout(() => setIndex((i) => (i + 1) % tabs.length), ROTATE_MS);
    return () => window.clearTimeout(t);
  }, [index, paused, picked, reduce]);

  const active = tabs[index];

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {/* Tabs */}
      <div role="tablist" aria-label="Product previews" className="mx-auto flex max-w-full gap-1 overflow-x-auto rounded-xl border border-border bg-white/80 p-1 shadow-sm backdrop-blur [scrollbar-width:none] md:w-fit">
        {tabs.map((t, i) => {
          const on = i === index;
          return (
            <button
              key={t.slug}
              role="tab"
              aria-selected={on}
              onClick={() => {
                setIndex(i);
                setPicked(true);
              }}
              className={`relative flex shrink-0 items-center gap-2 overflow-hidden rounded-lg px-3.5 py-2 text-[13px] font-medium transition-colors ${
                on ? "bg-accent text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <img src={productBySlug[t.slug].logo} alt="" className="h-4 w-4 object-contain" />
              {t.label}
              {on && !reduce && !picked && (
                <span
                  key={`${index}-${paused}`}
                  aria-hidden
                  className="absolute inset-x-2 bottom-0 h-0.5 origin-left rounded-full bg-primary"
                  style={{ animation: paused ? "none" : `cr-tab-progress ${ROTATE_MS}ms linear forwards`, transform: paused ? "scaleX(1)" : undefined }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Window */}
      <div className="relative mt-6 lg:mb-10">
        <div aria-hidden className="absolute -inset-x-10 -top-8 bottom-0 -z-10 rounded-[48px] bg-[radial-gradient(55%_60%_at_50%_40%,hsl(218_90%_90%/.9),transparent_75%)] blur-2xl" />

        <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-[0_40px_100px_-40px_rgba(15,23,42,0.35),0_0_0_1px_rgba(15,23,42,0.02)]">
          <div className="flex items-center gap-2 border-b border-border bg-muted/60 px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]/80" />
            <span className="mx-auto rounded-md bg-white px-3 py-0.5 text-[11px] text-muted-foreground ring-1 ring-border">{active.url}</span>
            <span className="w-[42px]" />
          </div>
          <div className="relative h-[360px] bg-[hsl(216_60%_99%)] p-4 md:h-[420px] md:p-6" role="tabpanel">
            {tabs.map((t, i) => (
              <div
                key={t.slug}
                aria-hidden={i !== index}
                className={`absolute inset-0 p-4 transition-all duration-500 md:p-6 ${
                  i === index ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
                }`}
              >
                <t.Screen />
              </div>
            ))}
          </div>
        </div>

        {/* Floating AI helper cards */}
        <div className="absolute -left-12 -bottom-10 hidden w-64 rounded-xl border border-border bg-white p-3.5 shadow-[0_20px_50px_-20px_rgba(15,23,42,0.35)] lg:block">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-accent text-primary">
              <ScanLine className="h-4 w-4" />
            </span>
            <div>
              <p className="text-[12px] font-semibold">OCR billing</p>
              <p className="text-[10.5px] text-muted-foreground">AI helper · just now</p>
            </div>
          </div>
          <p className="mt-2.5 text-[12px] leading-snug text-muted-foreground">
            Invoice <span className="font-medium text-foreground">INV-2231</span> captured with 12 line items.
          </p>
        </div>
        <div className="absolute -right-14 -top-16 hidden w-56 rounded-xl border border-border bg-white p-3.5 shadow-[0_20px_50px_-20px_rgba(15,23,42,0.35)] lg:block">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-emerald-50 text-emerald-600">
              <ShieldCheck className="h-4 w-4" />
            </span>
            <p className="text-[12px] font-semibold">Customer risk score</p>
          </div>
          <div className="mt-2.5 flex items-end justify-between">
            <p className="text-2xl font-semibold tracking-tight">82</p>
            <Pill tone="green">Low risk</Pill>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
            <div className="h-full w-[82%] rounded-full bg-emerald-500" />
          </div>
        </div>
      </div>
    </div>
  );
};
