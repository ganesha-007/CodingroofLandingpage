import goldLoan from "@/assets/products/gold-loan.svg";
import banking from "@/assets/products/banking.svg";
import surgicals from "@/assets/products/surgicals.svg";
import erp from "@/assets/products/erp.svg";
import textile from "@/assets/products/textile.svg";
import printing from "@/assets/products/printing.svg";
import retail from "@/assets/products/retail.svg";
import salon from "@/assets/products/salon.svg";
import fieldService from "@/assets/products/field-service.svg";
import { Bot, Mic, ScanLine, ShieldCheck, Smile, TrendingUp, type LucideIcon } from "lucide-react";

export interface Product {
  slug: string;
  name: string;
  logo: string;
  tag: string;
  desc: string;
  features: string[];
}

export const products: Product[] = [
  {
    slug: "gold-loan",
    name: "Gold Loan",
    logo: goldLoan,
    tag: "Lending & pawn operations",
    desc: "Valuation, disbursal, interest tracking, renewals and auctions for gold-loan lenders.",
    features: ["Gold valuation", "Loan disbursal", "Interest tracking", "Renewals", "Auctions"],
  },
  {
    slug: "banking",
    name: "Banking",
    logo: banking,
    tag: "Core banking",
    desc: "Accounts, deposits, loans, transactions and compliance-ready reporting.",
    features: ["Accounts and deposits", "Loans", "Transactions", "Compliance-ready reporting"],
  },
  {
    slug: "surgicals",
    name: "Surgicals",
    logo: surgicals,
    tag: "Medical supply chain",
    desc: "Batch tracking, expiry control, billing and reorder for surgical distributors.",
    features: ["Batch tracking", "Expiry control", "Billing", "Reorder"],
  },
  {
    slug: "erp",
    name: "ERP",
    logo: erp,
    tag: "Business operations",
    desc: "Procurement, inventory, sales, accounting and reporting on one connected backbone.",
    features: ["Procurement", "Inventory", "Sales", "Accounting and reporting"],
  },
  {
    slug: "textile",
    name: "Textile",
    logo: textile,
    tag: "Fabric & orders",
    desc: "Fabric, yarn and garment orders, production stages, stock and customer ledgers.",
    features: ["Fabric and yarn stock", "Garment orders", "Production stages", "Customer ledgers"],
  },
  {
    slug: "print",
    name: "Print",
    logo: printing,
    tag: "Print shop workflows",
    desc: "Quotes, job orders, proofing, production scheduling, costing and invoicing.",
    features: ["Quotes and job orders", "Proofing", "Production scheduling", "Costing and invoicing"],
  },
  {
    slug: "retail",
    name: "Retail",
    logo: retail,
    tag: "Stores & counters",
    desc: "Billing, stock and customers for every counter.",
    features: ["Counter billing", "Stock", "Customers"],
  },
  {
    slug: "salon",
    name: "Salon",
    logo: salon,
    tag: "Salons & spas",
    desc: "Appointments, stylists and billing for salons and spas.",
    features: ["Appointments", "Stylists", "Billing"],
  },
  {
    slug: "field-service",
    name: "Field Service",
    logo: fieldService,
    tag: "On-site operations",
    desc: "Jobs, technician scheduling and on-site check-in.",
    features: ["Jobs", "Technician scheduling", "On-site check-in"],
  },
];

export const productBySlug = Object.fromEntries(products.map((p) => [p.slug, p])) as Record<string, Product>;

export const aiHelpers: { icon: LucideIcon; name: string; desc: string }[] = [
  { icon: Smile, name: "Sentiment analysis", desc: "Read the mood across reviews, tickets and chats so teams act before small issues become churn." },
  { icon: Bot, name: "Chat bot", desc: "An always-on assistant that answers customers and staff using your own product data." },
  { icon: TrendingUp, name: "Stock prediction", desc: "Forecast demand per item and location to keep the right stock without tying up capital." },
  { icon: ShieldCheck, name: "Customer risk scoring", desc: "Score borrowers on repayment risk using behaviour and history, so you lend with confidence." },
  { icon: ScanLine, name: "OCR billing", desc: "Snap or upload an invoice and turn it into a structured bill, with no manual entry." },
  { icon: Mic, name: "Voice to billing", desc: "Speak line items aloud and watch them become invoice entries. Built for busy counters." },
];
