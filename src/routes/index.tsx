import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ShoppingCart, Flame, MapPin, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { CartProvider } from "@/hooks/use-cart";
import { ProductCard } from "@/components/menu/ProductCard";
import { CategoryNav, FloatingCartButton } from "@/components/menu/CategoryNav";
import { ProductOptionsDialog } from "@/components/menu/ProductOptionsDialog";
import { CartContents } from "@/components/menu/CartContents";
import { CheckoutDialog } from "@/components/menu/CheckoutDialog";
import {
  ACAI,
  BEBIDAS,
  FRASE_IMPACTO,
  NOME_PASTELARIA,
  PASTEIS,
  PORCOES,
  SALGADOS,
  ESPETINHOS,
  SUCOS,
  type Product,
} from "@/data/menu";
import logo from "@/assets/menu/logo.png";
import saborearLogo from "@/assets/saborear-logo.png.asset.json";


export const Route = createFileRoute("/")({
  component: () => (
    <CartProvider>
      <MenuPage />
    </CartProvider>
  ),
  head: () => ({
    meta: [
      { title: "Pastel do Nordeste — Cardápio Online | Peça pelo WhatsApp" },
      {
        name: "description",
        content:
          "O verdadeiro sabor nordestino em cada pastel. Pastéis, açaí, porções e sucos naturais. Monte seu pedido e receba pelo WhatsApp.",
      },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Pastel do Nordeste — Cardápio Online | Peça pelo WhatsApp" },
      {
        property: "og:description",
        content: "O verdadeiro sabor nordestino em cada pastel. Pastéis, açaí, porções e sucos naturais. Monte seu pedido e receba pelo WhatsApp.",
      },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Restaurant",
          name: NOME_PASTELARIA,
          servesCuisine: "Nordestina",
          description: FRASE_IMPACTO,
        }),
      },
    ],
  }),
});

function MenuPage() {
  const [selected, setSelected] = useState<Product | null>(null);
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [mobileCartOpen, setMobileCartOpen] = useState(false);

  function openOptions(p: Product) {
    setSelected(p);
    setOptionsOpen(true);
  }

  function goCheckout() {
    setMobileCartOpen(false);
    setCheckoutOpen(true);
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <CategoryNav />

      {/* Hero */}
      <section className="relative">
        <div className="relative mx-auto max-w-7xl px-4 py-10">
          <div className="flex animate-fade-up-blur justify-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
              <Flame className="h-4 w-4" /> Feito na hora, sabor de verdade
            </span>
          </div>

          <div className="mx-auto mt-6 grid w-full max-w-xl animate-fade-up-blur grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="flex items-start gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <div className="min-w-0">
                <p className="font-semibold text-foreground">Seabra - BA</p>
                
                <p className="text-xs font-medium text-primary">Quarta-feira</p>
              </div>
            </div>
            <div className="flex items-start gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <div className="min-w-0">
                <p className="font-semibold text-foreground">Povoado de Lagoa da Boa Vista</p>
                <p className="text-xs font-medium text-primary">De quinta a domingo</p>
              </div>
            </div>
          </div>


        </div>
      </section>


      {/* Cardápio + Carrinho */}
      <main
        id="cardapio"
        className="mx-auto max-w-7xl px-4 py-12 lg:grid lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-8"
      >
        <div className="space-y-14">
          <MenuSection id="pasteis" title="Pastéis" subtitle="Crocantes e recheados na hora">
            <Grid>
              {PASTEIS.map((p) => (
                <ProductCard key={p.id} product={p} onOpenOptions={openOptions} />
              ))}
            </Grid>
          </MenuSection>

          <MenuSection id="acai" title="Açaí" subtitle="Escolha o tamanho e até 3 acompanhamentos grátis">
            <Grid>
              <ProductCard product={ACAI} onOpenOptions={openOptions} />
            </Grid>
          </MenuSection>

          <MenuSection id="sucos" title="Sucos Naturais" subtitle="Consulte os sabores disponíveis">
            <Grid>
              <ProductCard product={SUCOS} onOpenOptions={openOptions} />
            </Grid>
          </MenuSection>

          <MenuSection id="porcoes" title="Porções" subtitle="Para compartilhar e saborear">
            <Grid>
              {PORCOES.map((p) => (
                <ProductCard key={p.id} product={p} onOpenOptions={openOptions} />
              ))}
            </Grid>
          </MenuSection>

          <MenuSection id="salgados" title="Salgados" subtitle="Crocantes e feitos na hora">
            <Grid>
              {SALGADOS.map((p) => (
                <ProductCard key={p.id} product={p} onOpenOptions={openOptions} />
              ))}
            </Grid>
          </MenuSection>

          <MenuSection id="espetinhos" title="Espetinhos" subtitle="Empanados à milanesa">
            <Grid>
              {ESPETINHOS.map((p) => (
                <ProductCard key={p.id} product={p} onOpenOptions={openOptions} />
              ))}
            </Grid>
          </MenuSection>

          <MenuSection id="bebidas" title="Bebidas" subtitle="Geladas para acompanhar seu pedido">
            <Grid>
              {BEBIDAS.map((p) => (
                <ProductCard key={p.id} product={p} onOpenOptions={openOptions} />
              ))}
            </Grid>
          </MenuSection>
        </div>

        {/* Carrinho fixo desktop */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 flex max-h-[calc(100vh-7rem)] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-lg">
            <div className="border-b border-border p-4">
              <h2 className="flex items-center gap-2 font-serif text-xl font-bold">
                <ShoppingCart className="h-5 w-5 text-primary" /> Seu Pedido
              </h2>
            </div>
            <CartContents onCheckout={goCheckout} />
          </div>
        </aside>
      </main>

      <SiteFooter />

      {/* Botão flutuante do carrinho */}
      <FloatingCartButton onClick={() => setMobileCartOpen(true)} />

      {/* Drawer mobile */}
      <Sheet open={mobileCartOpen} onOpenChange={setMobileCartOpen}>
        <SheetContent side="right" hideClose className="flex w-full flex-col gap-0 p-0 sm:max-w-md">
          <SheetHeader className="flex flex-row items-center justify-between border-b border-border p-4 text-left">
            <SheetTitle className="flex items-center gap-2 font-serif text-xl">
              <ShoppingCart className="h-5 w-5 text-primary" /> Seu Pedido
            </SheetTitle>
            <button
              type="button"
              onClick={() => setMobileCartOpen(false)}
              aria-label="Fechar carrinho"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <X className="h-5 w-5" />
            </button>
          </SheetHeader>
          <CartContents onCheckout={goCheckout} />
        </SheetContent>
      </Sheet>

      <ProductOptionsDialog product={selected} open={optionsOpen} onOpenChange={setOptionsOpen} />
      <CheckoutDialog open={checkoutOpen} onOpenChange={setCheckoutOpen} />
    </div>
  );
}

function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-3">
        <img
          src={saborearLogo.url}
          alt={`Logo ${NOME_PASTELARIA}`}
          className="h-16 w-auto sm:h-20"
        />
      </div>
    </header>
  );
}


function MenuSection({
  id,
  title,
  subtitle,
  children,
}: {
  id?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-36">
      <div className="mb-5 text-center">
        <div className="relative flex justify-center">
          <span className="inline-block rounded-md bg-primary px-8 py-2.5 font-sans text-2xl font-extrabold uppercase tracking-wider text-primary-foreground shadow-md sm:text-3xl">
            {title}
          </span>
        </div>
        {subtitle && <p className="mt-3 text-muted-foreground">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">{children}</div>;
}

function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-10 text-center">
        <div className="mb-3 flex items-center justify-center">
          <img src={saborearLogo.url} alt={`Logo ${NOME_PASTELARIA}`} className="h-16 w-auto sm:h-20" />
        </div>
        <p className="text-sm text-muted-foreground">{FRASE_IMPACTO}</p>
        <p className="mt-4 text-xs text-muted-foreground">
          © {new Date().getFullYear()} {NOME_PASTELARIA}. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
