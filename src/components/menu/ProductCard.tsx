import { toast } from "sonner";
import { Plus, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatBRL, type Product, SEU_NUMERO_WHATSAPP } from "@/data/menu";
import { useCart } from "@/hooks/use-cart";

export function ProductCard({
  product,
  onOpenOptions,
}: {
  product: Product;
  onOpenOptions: (p: Product) => void;
}) {
  const { addItem } = useCart();
  const hasOptions = product.kind === "pastel" || product.kind === "acai";
  const isSuco = product.kind === "suco";

  function handleClick() {
    if (isSuco) {
      const url = `https://wa.me/${SEU_NUMERO_WHATSAPP}?text=${encodeURIComponent(
        "Olá! Gostaria de saber os sabores de sucos naturais disponíveis.",
      )}`;
      window.open(url, "_blank");
      return;
    }
    if (hasOptions) {
      onOpenOptions(product);
      return;
    }
    addItem({ productId: product.id, name: product.name, unitPrice: product.price, image: product.image, kind: product.kind, extras: [] });
    toast.success(`${product.name} adicionado!`, { description: "Item no carrinho." });
  }

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={1024}
          height={1024}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {product.price > 0 && (
          <span className="absolute right-3 top-3 rounded-full bg-background/90 px-3 py-1 text-sm font-bold text-primary shadow-sm backdrop-blur">
            {formatBRL(product.price)}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-serif text-lg font-semibold leading-tight">{product.name}</h3>
        <p className="mt-1 flex-1 text-sm text-muted-foreground">{product.description}</p>
        <Button
          onClick={handleClick}
          className="mt-4 w-full gap-2"
          variant={isSuco ? "outline" : "default"}
        >
          {isSuco ? (
            <>
              <MessageCircle className="h-4 w-4" />
              Consultar sabores
            </>
          ) : (
            <>
              <Plus className="h-4 w-4" />
              {hasOptions ? "Escolher" : "Adicionar"}
            </>
          )}
        </Button>
      </div>
    </article>
  );
}
