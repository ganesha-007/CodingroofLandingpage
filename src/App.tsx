import { Route, Routes } from "react-router-dom";
import { SmoothScroll } from "@/components/SmoothScroll";
import LandingPage from "@/pages/LandingPage";

function App() {
  return (
    <SmoothScroll>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<PlaceholderPage title="Sign in" />} />
        <Route path="/dashboard" element={<PlaceholderPage title="Dashboard" />} />
      </Routes>
    </SmoothScroll>
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
