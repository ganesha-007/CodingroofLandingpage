import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import { AuthProvider } from "@/contexts/AuthContext";
import App from "./App";

export { buildLlmsTxt } from "@/seo/llms";
export { pages, seoFor, ldGraph, SITE_URL, DEFAULT_IMAGE } from "@/seo/pages";

export const render = (url: string) =>
  renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </StaticRouter>
    </StrictMode>
  );
