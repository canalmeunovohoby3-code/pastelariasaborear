import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import {
  ACAI_ACOMPANHAMENTOS,
  ACAI_MAX_ACOMPANHAMENTOS,
  ACAI_TAMANHOS,
  BORDAS,
  formatBRL,
  getAcaiImage,
  type Product,
} from "@/data/menu";
import { useCart } from "@/hooks/use-cart";

export function ProductOptionsDialog({
  product,
  open,
  onOpenChange,
}: {
  product: Product | null;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [borda, setBorda] = useState<string>("none");
  const [tamanho, setTamanho] = useState<string>(ACAI_TAMANHOS[1].id);
  const [acompanhamentos, setAcompanhamentos] = useState<string[]>([]);

  useEffect(() => {
    if (open) {
      setQty(1);
      setBorda("none");
      setTamanho(ACAI_TAMANHOS[1].id);
      setAcompanhamentos([]);
    }
  }, [open]);

  const isPastel = product?.kind === "pastel";
  const isAcai = product?.kind === "acai";

  const unitPrice = useMemo(() => {
    if (!product) return 0;
    if (isPastel) {
      const b = BORDAS.find((x) => x.id === borda);
      return product.price + (b?.price ?? 0);
    }
    if (isAcai) {
      const t = ACAI_TAMANHOS.find((x) => x.id === tamanho);
      return t?.price ?? product.price;
    }
    return product.price;
  }, [product, isPastel, isAcai, borda, tamanho]);

  function toggleAcompanhamento(name: string, checked: boolean) {
    setAcompanhamentos((prev) => {
      if (checked) {
        if (prev.length >= ACAI_MAX_ACOMPANHAMENTOS) {
          toast.warning("Você pode escolher apenas 3 acompanhamentos.");
          return prev;
        }
        return [...prev, name];
      }
      return prev.filter((n) => n !== name);
    });
  }

  function handleAdd() {
    if (!product) return;
    const extras: string[] = [];
    let name = product.name;

    if (isPastel && borda !== "none") {
      const b = BORDAS.find((x) => x.id === borda);
      if (b) extras.push(`Borda: ${b.name} (+${formatBRL(b.price)})`);
    }
    const image = isAcai ? getAcaiImage(tamanho) : product.image;

    if (isAcai) {
      const t = ACAI_TAMANHOS.find((x) => x.id === tamanho);
      if (t) name = `Açaí ${t.name}`;
      if (acompanhamentos.length) {
        extras.push(`Acompanhamentos: ${acompanhamentos.join(", ")}`);
      } else {
        extras.push("Sem acompanhamentos");
      }
    }

    addItem({ productId: product.id, name, unitPrice, image, kind: product.kind, extras, qty });
    toast.success(`${qty}x ${name} adicionado!`, { description: "Item no carrinho." });
    onOpenChange(false);
  }

  if (!product) return null;

  const previewImage = isAcai ? getAcaiImage(tamanho) : product.image;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-md">
        <DialogHeader>
          <img
            src={previewImage}
            alt={product.name}
            className="mb-2 h-40 w-full rounded-xl object-cover"
            width={1024}
            height={1024}
          />
          <DialogTitle className="font-serif text-2xl">{product.name}</DialogTitle>
          <DialogDescription>{product.description}</DialogDescription>
        </DialogHeader>

        {isPastel && (
          <div className="space-y-3">
            <p className="text-sm font-semibold">Adicionar borda? (opcional)</p>
            <RadioGroup value={borda} onValueChange={setBorda} className="gap-2">
              <label className="flex cursor-pointer items-center justify-between rounded-lg border border-border p-3 transition-colors hover:bg-secondary has-[:checked]:border-primary has-[:checked]:bg-secondary">
                <span className="flex items-center gap-3">
                  <RadioGroupItem value="none" id="borda-none" />
                  <span>Sem borda</span>
                </span>
                <span className="text-sm text-muted-foreground">Grátis</span>
              </label>
              {BORDAS.map((b) => (
                <label
                  key={b.id}
                  className="flex cursor-pointer items-center justify-between rounded-lg border border-border p-3 transition-colors hover:bg-secondary has-[:checked]:border-primary has-[:checked]:bg-secondary"
                >
                  <span className="flex items-center gap-3">
                    <RadioGroupItem value={b.id} id={`borda-${b.id}`} />
                    <span>{b.name}</span>
                  </span>
                  <span className="text-sm font-medium text-primary">+{formatBRL(b.price)}</span>
                </label>
              ))}
            </RadioGroup>
          </div>
        )}

        {isAcai && (
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-semibold">Escolha o tamanho</p>
              <RadioGroup value={tamanho} onValueChange={setTamanho} className="gap-2">
                {ACAI_TAMANHOS.map((t) => (
                  <label
                    key={t.id}
                    className="flex cursor-pointer items-center justify-between rounded-lg border border-border p-3 transition-colors hover:bg-secondary has-[:checked]:border-primary has-[:checked]:bg-secondary"
                  >
                    <span className="flex items-center gap-3">
                      <RadioGroupItem value={t.id} id={`tam-${t.id}`} />
                      <span>{t.name}</span>
                    </span>
                    <span className="text-sm font-medium text-primary">{formatBRL(t.price)}</span>
                  </label>
                ))}
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-semibold">
                Acompanhamentos grátis{" "}
                <span className="font-normal text-muted-foreground">
                  ({acompanhamentos.length}/{ACAI_MAX_ACOMPANHAMENTOS})
                </span>
              </p>
              <div className="grid grid-cols-2 gap-2">
                {ACAI_ACOMPANHAMENTOS.map((a) => {
                  const checked = acompanhamentos.includes(a);
                  return (
                    <label
                      key={a}
                      className="flex cursor-pointer items-center gap-2 rounded-lg border border-border p-2.5 text-sm transition-colors hover:bg-secondary has-[:checked]:border-primary has-[:checked]:bg-secondary"
                    >
                      <Checkbox
                        checked={checked}
                        onCheckedChange={(c) => toggleAcompanhamento(a, Boolean(c))}
                      />
                      {a}
                    </label>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        <DialogFooter className="mt-2 flex-row items-center justify-between gap-3 sm:justify-between">
          <div className="flex items-center gap-1 rounded-full border border-border p-1">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              aria-label="Diminuir quantidade"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-6 text-center font-semibold tabular-nums">{qty}</span>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={() => setQty((q) => q + 1)}
              aria-label="Aumentar quantidade"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <Button onClick={handleAdd} className="flex-1 gap-2">
            <ShoppingBag className="h-4 w-4" />
            Adicionar {formatBRL(unitPrice * qty)}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
