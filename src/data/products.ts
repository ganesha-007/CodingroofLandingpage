import goldLoan from "@/assets/products/gold-loan.svg";
import banking from "@/assets/products/banking.svg";
import surgicals from "@/assets/products/surgicals.svg";
import erp from "@/assets/products/erp.svg";
import textile from "@/assets/products/textile.svg";
import printing from "@/assets/products/printing.svg";
import retail from "@/assets/products/retail.svg";
import salon from "@/assets/products/salon.svg";
import fieldService from "@/assets/products/field-service.svg";

export interface Product {
  slug: string;
  name: string;
  logo: string;
  tag: string;
  desc: string;
}

export const products: Product[] = [
  {
    slug: "gold-loan",
    name: "Gold Loan",
    logo: goldLoan,
    tag: "Lending & pawn operations",
    desc: "Valuation, disbursal, interest tracking, renewals and auctions for gold-loan lenders.",
  },
  {
    slug: "banking",
    name: "Banking",
    logo: banking,
    tag: "Core banking",
    desc: "Accounts, deposits, loans, transactions and compliance-ready reporting.",
  },
  {
    slug: "surgicals",
    name: "Surgicals",
    logo: surgicals,
    tag: "Medical supply chain",
    desc: "Batch tracking, expiry control, billing and reorder for surgical distributors.",
  },
  {
    slug: "erp",
    name: "ERP",
    logo: erp,
    tag: "Business operations",
    desc: "Procurement, inventory, sales, accounting and reporting on one connected backbone.",
  },
  {
    slug: "textile",
    name: "Textile",
    logo: textile,
    tag: "Fabric & orders",
    desc: "Fabric, yarn and garment orders, production stages, stock and customer ledgers.",
  },
  {
    slug: "print",
    name: "Print",
    logo: printing,
    tag: "Print shop workflows",
    desc: "Quotes, job orders, proofing, production scheduling, costing and invoicing.",
  },
  {
    slug: "retail",
    name: "Retail",
    logo: retail,
    tag: "Stores & counters",
    desc: "Billing, stock and customers for every counter, from one store to many.",
  },
  {
    slug: "salon",
    name: "Salon",
    logo: salon,
    tag: "Salons & spas",
    desc: "Appointments, stylists, memberships and billing for salons and spas.",
  },
  {
    slug: "field-service",
    name: "Field Service",
    logo: fieldService,
    tag: "On-site operations",
    desc: "Jobs, technician scheduling, on-site check-in and service reports.",
  },
];

export const productBySlug = Object.fromEntries(products.map((p) => [p.slug, p])) as Record<string, Product>;
