import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FORMAS_PAGAMENTO, LOCAIS_ENTREGA, formatBRL } from "@/data/menu";
import {
  buildWhatsAppMessage,
  openWhatsApp,
  useCart,
  type CustomerInfo,
} from "@/hooks/use-cart";

const baseSchema = {
  nome: z.string().trim().min(2, "Informe seu nome").max(100),
  telefone: z.string().trim().min(8, "Informe um telefone válido").max(20),
  complemento: z.string().trim().max(100),
  referencia: z.string().trim().max(150),
  observacoes: z.string().trim().max(500),
  pagamento: z.enum(FORMAS_PAGAMENTO, { message: "Selecione a forma de pagamento" }),
  troco: z.string().trim().max(20),
};

const entregaSchema = z.object({
  ...baseSchema,
  endereco: z.string().trim().min(2, "Informe o endereço").max(150),
  numero: z.string().trim().min(1, "Nº").max(20),
  bairro: z.string().trim().min(1, "Informe o bairro").max(80),
  cidade: z.string().trim().min(1, "Informe a cidade").max(80),
});

const semEnderecoSchema = z.object({
  ...baseSchema,
  endereco: z.string().trim().max(150),
  numero: z.string().trim().max(20),
  bairro: z.string().trim().max(80),
  cidade: z.string().trim().max(80),
});

const empty: CustomerInfo = {
  nome: "",
  telefone: "",
  endereco: "",
  numero: "",
  complemento: "",
  bairro: "",
  cidade: "",
  referencia: "",
  observacoes: "",
  pagamento: "",
  troco: "",
};

export function CheckoutDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const { items, subtotal, taxaEntrega, total, localEntrega, tipoPedido, clear } = useCart();
  const [form, setForm] = useState<CustomerInfo>(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});


  function set<K extends keyof CustomerInfo>(key: K, value: CustomerInfo[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (items.length === 0) {
      toast.error("Seu carrinho está vazio.");
      return;
    }
    if (tipoPedido === "entrega" && !localEntrega) {
      toast.error("Selecione o local da entrega no carrinho.");
      return;
    }
    const schema = tipoPedido === "entrega" ? entregaSchema : semEnderecoSchema;
    const result = schema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        fieldErrors[issue.path[0] as string] = issue.message;
      }
      setErrors(fieldErrors);
      toast.error("Confira os campos destacados.");
      return;
    }
    setErrors({});
    const message = buildWhatsAppMessage(
      items,
      result.data as CustomerInfo,
      subtotal,
      localEntrega,
      tipoPedido,
    );
    openWhatsApp(message);

    toast.success("Pedido enviado! Abrindo o WhatsApp...");
    clear();
    setForm(empty);
    onOpenChange(false);
  }

  const field = (
    key: keyof CustomerInfo,
    label: string,
    opts: { required?: boolean; type?: string; placeholder?: string } = {},
  ) => (
    <div className="space-y-1.5">
      <Label htmlFor={key}>
        {label} {opts.required && <span className="text-primary">*</span>}
      </Label>
      <Input
        id={key}
        type={opts.type ?? "text"}
        placeholder={opts.placeholder}
        value={form[key] as string}
        onChange={(e) => set(key, e.target.value as never)}
        aria-invalid={Boolean(errors[key])}
      />
      {errors[key] && <p className="text-xs text-destructive">{errors[key]}</p>}
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">Finalizar Pedido</DialogTitle>
          <DialogDescription>
            Preencha seus dados para enviarmos o pedido pelo WhatsApp.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {field("nome", "Nome", { required: true })}
            {field("telefone", "Telefone", { required: true, type: "tel", placeholder: "(00) 00000-0000" })}
          </div>
          {tipoPedido === "entrega" && (
            <>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_120px]">
                {field("endereco", "Endereço", { required: true })}
                {field("numero", "Número", { required: true })}
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {field("complemento", "Complemento")}
                {field("bairro", "Bairro", { required: true })}
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {field("cidade", "Cidade", { required: true })}
                {field("referencia", "Ponto de referência")}
              </div>
            </>
          )}

          <div className="space-y-1.5">
            <Label htmlFor="observacoes">Observações do pedido</Label>
            <Textarea
              id="observacoes"
              placeholder="Ex.: sem cebola, capricha no molho..."
              value={form.observacoes}
              onChange={(e) => set("observacoes", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>
              Forma de pagamento <span className="text-primary">*</span>
            </Label>
            <div className="grid grid-cols-2 gap-2">
              {FORMAS_PAGAMENTO.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => set("pagamento", f)}
                  className={`rounded-lg border p-3 text-sm font-medium transition-all ${
                    form.pagamento === f
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:bg-secondary"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
            {errors.pagamento && <p className="text-xs text-destructive">{errors.pagamento}</p>}
          </div>

          {form.pagamento === "Dinheiro" && (
            <div className="animate-slide-reveal space-y-1.5">
              <Label htmlFor="troco">Troco para quanto?</Label>
              <Input
                id="troco"
                placeholder="Ex.: R$ 50,00"
                value={form.troco}
                onChange={(e) => set("troco", e.target.value)}
              />
            </div>
          )}

          <div className="space-y-1.5 rounded-xl bg-secondary p-4 text-sm">
            <div className="flex items-center justify-between text-muted-foreground">
              <span>Subtotal dos produtos</span>
              <span className="tabular-nums">{formatBRL(subtotal)}</span>
            </div>
            {tipoPedido === "entrega" && (
              <div className="flex items-center justify-between text-muted-foreground">
                <span>
                  🚚 Taxa de entrega
                  {localEntrega && (
                    <span className="ml-1 text-xs">
                      ({LOCAIS_ENTREGA.find((l) => l.id === localEntrega)?.nome})
                    </span>
                  )}
                </span>
                <span className="tabular-nums">{formatBRL(taxaEntrega)}</span>
              </div>
            )}
            <div className="flex items-center justify-between border-t border-border pt-2">
              <span className="font-semibold">💰 Total do pedido</span>
              <span className="font-serif text-2xl font-bold text-primary">{formatBRL(total)}</span>
            </div>
          </div>


          <Button type="submit" size="lg" className="w-full gap-2 text-base">
            Enviar pedido pelo WhatsApp
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
