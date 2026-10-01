import { Minus, Plus, Trash2, ShoppingCart, Truck, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatBRL, LOCAIS_ENTREGA } from "@/data/menu";
import { useCart, type TipoPedido } from "@/hooks/use-cart";

export function CartContents({ onCheckout }: { onCheckout: () => void }) {
  const {
    items,
    increment,
    decrement,
    removeItem,
    subtotal,

    localEntrega,
    setLocalEntrega,
    taxaEntrega,
    total,
    tipoPedido,
    setTipoPedido,
  } = useCart();

  const TIPOS: { id: TipoPedido; label: string; icon: typeof Truck }[] = [
    { id: "entrega", label: "Entrega", icon: Truck },
    { id: "local", label: "Consumir no local", icon: Utensils },
  ];


  if (items.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 py-12 text-center">
        <div className="grid h-16 w-16 place-items-center rounded-full bg-secondary text-muted-foreground">
          <ShoppingCart className="h-7 w-7" />
        </div>
        <p className="font-serif text-lg">Seu carrinho está vazio</p>
        <p className="text-sm text-muted-foreground">
          Escolha seus pastéis favoritos e monte seu pedido.
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {items.map((item) => (
          <div
            key={item.uid}
            className="animate-fade-up-blur flex gap-3 rounded-xl border border-border bg-card p-3"
          >
            <img
              src={item.image}
              alt={item.name}
              loading="lazy"
              className="h-16 w-16 shrink-0 rounded-lg object-cover"
            />
            <div className="flex min-w-0 flex-1 flex-col">
              <div className="flex items-start justify-between gap-2">
                <h4 className="truncate text-sm font-semibold">{item.name}</h4>
                <button
                  onClick={() => removeItem(item.uid)}
                  className="shrink-0 text-muted-foreground transition-colors hover:text-destructive"
                  aria-label={`Remover ${item.name}`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              {item.extras.map((e, i) => (
                <p key={i} className="truncate text-xs text-muted-foreground">
                  {e}
                </p>
              ))}
              <div className="mt-auto flex items-center justify-between pt-2">
                <div className="flex items-center gap-1 rounded-full border border-border">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 rounded-full"
                    onClick={() => decrement(item.uid)}
                    aria-label="Diminuir"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </Button>
                  <span className="w-5 text-center text-sm font-semibold tabular-nums">
                    {item.qty}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 rounded-full"
                    onClick={() => increment(item.uid)}
                    aria-label="Aumentar"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </Button>
                </div>
                <span className="text-sm font-bold text-primary">
                  {formatBRL(item.unitPrice * item.qty)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-border bg-card/60 p-4 backdrop-blur">
        <div className="mb-3 space-y-2">
          <div className="text-sm font-semibold">
            Tipo de pedido <span className="text-primary">*</span>
          </div>
          <div className="grid grid-cols-1 gap-2">
            {TIPOS.map((t) => {
              const Icon = t.icon;
              const active = tipoPedido === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTipoPedido(t.id)}
                  className={`flex items-center gap-2 rounded-lg border p-2.5 text-sm font-medium transition-all ${
                    active
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:bg-secondary"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{t.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {tipoPedido === "entrega" && (
          <div className="mb-3 space-y-2">
            <div className="flex items-center gap-1.5 text-sm font-semibold">
              <Truck className="h-4 w-4 text-primary" /> Local da Entrega{" "}
              <span className="text-primary">*</span>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {LOCAIS_ENTREGA.map((l) => (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => setLocalEntrega(l.id)}
                  className={`flex items-center justify-between rounded-lg border p-2.5 text-sm font-medium transition-all ${
                    localEntrega === l.id
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:bg-secondary"
                  }`}
                >
                  <span>{l.nome}</span>
                  <span className="tabular-nums">{formatBRL(l.taxa)}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mb-3 space-y-1.5 rounded-xl bg-secondary/60 p-3 text-sm">
          <div className="flex items-center justify-between text-muted-foreground">
            <span>Subtotal dos produtos</span>
            <span className="tabular-nums">{formatBRL(subtotal)}</span>
          </div>
          {tipoPedido === "entrega" && (
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="flex items-center gap-1">🚚 Taxa de entrega</span>
              <span className="tabular-nums">
                {localEntrega ? formatBRL(taxaEntrega) : "—"}
              </span>
            </div>
          )}
          <div className="flex items-center justify-between border-t border-border pt-1.5 text-base font-bold">
            <span>💰 Total</span>
            <span className="font-serif text-primary tabular-nums">{formatBRL(total)}</span>
          </div>
        </div>

        <Button
          size="lg"
          className="w-full gap-2 text-base"
          onClick={onCheckout}
          disabled={tipoPedido === "entrega" && !localEntrega}
        >
          {tipoPedido === "entrega" && !localEntrega
            ? "Selecione o local da entrega"
            : "Finalizar Pedido"}
        </Button>
      </div>

    </div>
  );
}
