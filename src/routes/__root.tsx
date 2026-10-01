import { Outlet, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";

import appCss from "../styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: "Pastel do Nordeste — Cardápio Online | Peça pelo WhatsApp" },
      { name: "description", content: "O verdadeiro sabor nordestino em cada pastel. Pastéis, açaí, porções e sucos naturais. Monte seu pedido e receba pelo WhatsApp." },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Pastel do Nordeste — Cardápio Online | Peça pelo WhatsApp" },
      { name: "twitter:title", content: "Pastel do Nordeste — Cardápio Online | Peça pelo WhatsApp" },
      { property: "og:description", content: "O verdadeiro sabor nordestino em cada pastel. Pastéis, açaí, porções e sucos naturais. Monte seu pedido e receba pelo WhatsApp." },
      { name: "twitter:description", content: "O verdadeiro sabor nordestino em cada pastel. Pastéis, açaí, porções e sucos naturais. Monte seu pedido e receba pelo WhatsApp." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/3nLGAeJgXOMJIvLtMGLS9T9RXaZ2/social-images/social-1783551704823-l_3543_SEM_FUNDO.webp" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/3nLGAeJgXOMJIvLtMGLS9T9RXaZ2/social-images/social-1783551704823-l_3543_SEM_FUNDO.webp" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,400;1,9..144,500&family=Mulish:wght@300;400;500;600;700;800&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
    scripts: [],
  }),
  shellComponent: RootShell,
  component: RootComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="pb-[env(safe-area-inset-bottom)]">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <>
      <div className="animate-page-enter">
        <Outlet />
      </div>
      <Toaster position="top-center" />
    </>
  );
}
