import { Route, Routes } from "react-router-dom";
import LandingPage from "@/pages/LandingPage";
import ProductsPage from "@/pages/ProductsPage";
import PartnersPage from "@/pages/PartnersPage";
import CareersPage from "@/pages/CareersPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/partners" element={<PartnersPage />} />
      <Route path="/careers" element={<CareersPage />} />
      <Route path="/login" element={<PlaceholderPage title="Sign in" />} />
      <Route path="/dashboard" element={<PlaceholderPage title="Dashboard" />} />
    </Routes>
  );
}

function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-background text-foreground">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <a href="/" className="text-sm text-muted-foreground underline">
        Back to home
      </a>
    </div>
  );
}

export default App;
