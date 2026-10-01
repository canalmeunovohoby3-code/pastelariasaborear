import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import {
  formatBRL,
  SEU_NUMERO_WHATSAPP,
  NOME_PASTELARIA,
  LOCAIS_ENTREGA,
  type FormaPagamento,
  type LocalEntregaId,
  type ProductKind,
} from "@/data/menu";



export type TipoPedido = "entrega" | "local" | "retirada";

export interface CartItem {
  uid: string;
  productId: string;
  name: string;
  unitPrice: number;
  qty: number;
  image: string;
  kind: ProductKind;
  /** Linhas descritivas de extras (borda, tamanho, acompanhamentos) */
  extras: string[];
}


export interface CustomerInfo {
  nome: string;
  telefone: string;
  endereco: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  referencia: string;
  observacoes: string;
  pagamento: FormaPagamento | "";
  troco: string;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "uid" | "qty"> & { qty?: number }) => void;
  increment: (uid: string) => void;
  decrement: (uid: string) => void;
  removeItem: (uid: string) => void;
  clear: () => void;
  totalItems: number;
  subtotal: number;
  localEntrega: LocalEntregaId | "";
  setLocalEntrega: (id: LocalEntregaId | "") => void;
  taxaEntrega: number;
  total: number;
  tipoPedido: TipoPedido;
  setTipoPedido: (t: TipoPedido) => void;
}


const CartContext = createContext<CartContextValue | null>(null);

let idCounter = 0;
const newUid = () => `ci_${Date.now()}_${idCounter++}`;

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [localEntrega, setLocalEntrega] = useState<LocalEntregaId | "">("");
  const [tipoPedido, setTipoPedido] = useState<TipoPedido>("entrega");


  const addItem: CartContextValue["addItem"] = (item) => {
    setItems((prev) => {
      const signature = `${item.productId}|${item.extras.join("|")}|${item.unitPrice}`;
      const existing = prev.find(
        (p) => `${p.productId}|${p.extras.join("|")}|${p.unitPrice}` === signature,
      );
      if (existing) {
        return prev.map((p) =>
          p.uid === existing.uid ? { ...p, qty: p.qty + (item.qty ?? 1) } : p,
        );
      }
      return [...prev, { ...item, uid: newUid(), qty: item.qty ?? 1 }];
    });
  };

  const increment = (uid: string) =>
    setItems((prev) => prev.map((p) => (p.uid === uid ? { ...p, qty: p.qty + 1 } : p)));

  const decrement = (uid: string) =>
    setItems((prev) =>
      prev
        .map((p) => (p.uid === uid ? { ...p, qty: p.qty - 1 } : p))
        .filter((p) => p.qty > 0),
    );

  const removeItem = (uid: string) =>
    setItems((prev) => prev.filter((p) => p.uid !== uid));

  const clear = () => setItems([]);

  const totalItems = useMemo(() => items.reduce((s, i) => s + i.qty, 0), [items]);
  const subtotal = useMemo(
    () => items.reduce((s, i) => s + i.unitPrice * i.qty, 0),
    [items],
  );
  const taxaEntrega = useMemo(
    () =>
      tipoPedido === "entrega"
        ? (LOCAIS_ENTREGA.find((l) => l.id === localEntrega)?.taxa ?? 0)
        : 0,
    [localEntrega, tipoPedido],
  );
  const total = subtotal + taxaEntrega;

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        increment,
        decrement,
        removeItem,
        clear,
        totalItems,
        subtotal,
        localEntrega,
        setLocalEntrega,
        taxaEntrega,
        total,
        tipoPedido,
        setTipoPedido,
      }}
    >
      {children}

    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart deve ser usado dentro de CartProvider");
  return ctx;
}

const SEP = "━━━━━━━━━━━━━━━━━━";

const CATEGORIAS: { kind: ProductKind; titulo: string; resumo: string }[] = [
  { kind: "pastel", titulo: "🥟 *PASTÉIS*", resumo: "Pastéis" },
  { kind: "acai", titulo: "🍧 *AÇAÍ*", resumo: "Açaí" },
  { kind: "suco", titulo: "🥤 *SUCOS*", resumo: "Sucos" },
  { kind: "porcao", titulo: "🍟 *PORÇÕES*", resumo: "Porções" },
  { kind: "salgado", titulo: "🥟 *SALGADOS*", resumo: "Salgados" },
  { kind: "espetinho", titulo: "🍢 *ESPETINHOS*", resumo: "Espetinhos" },
  { kind: "bebida", titulo: "🍻 *BEBIDAS*", resumo: "Bebidas" },
];

export function buildWhatsAppMessage(
  items: CartItem[],
  customer: CustomerInfo,
  subtotal: number,
  localEntrega: LocalEntregaId | "" = "",
  tipoPedido: TipoPedido = "entrega",
): string {
  const local = LOCAIS_ENTREGA.find((x) => x.id === localEntrega);
  const taxa = tipoPedido === "entrega" ? (local?.taxa ?? 0) : 0;
  const total = subtotal + taxa;

  const tipoLabel: Record<TipoPedido, string> = {
    entrega: "🛵 Entrega",
    local: "🍽️ Consumir no local",
    retirada: "🥡 Retirada no balcão",
  };

  const l: string[] = [];
  l.push("🛍️ *NOVO PEDIDO*");
  l.push(SEP);
  l.push("");
  l.push("👤 *Cliente*");
  l.push(`• Nome: ${customer.nome}`);
  l.push("");
  l.push("📞 *Telefone*");
  l.push(`• ${customer.telefone}`);
  l.push("");
  l.push("📦 *Tipo de Pedido*");
  l.push(`• ${tipoLabel[tipoPedido]}`);
  if (tipoPedido === "entrega") {
    l.push("");
    l.push("📍 *Endereço de Entrega*");
    l.push(`• Rua: ${customer.endereco}`);
    l.push(`• Número: ${customer.numero}`);
    if (customer.bairro) l.push(`• Bairro: ${customer.bairro}`);
    if (customer.cidade) l.push(`• Cidade: ${customer.cidade}`);
    if (customer.complemento) l.push(`• Complemento: ${customer.complemento}`);
    if (customer.referencia) l.push(`• Referência: ${customer.referencia}`);
  }

  const subtotais: Record<ProductKind, number> = {
    pastel: 0,
    acai: 0,
    suco: 0,
    porcao: 0,
    bebida: 0,
    salgado: 0,
    espetinho: 0,
  };

  for (const cat of CATEGORIAS) {
    const catItems = items.filter((i) => i.kind === cat.kind);
    if (catItems.length === 0) continue;
    const catSubtotal = catItems.reduce((s, i) => s + i.unitPrice * i.qty, 0);
    subtotais[cat.kind] = catSubtotal;

    l.push("");
    l.push(SEP);
    l.push("");
    l.push(cat.titulo);
    l.push("");
    catItems.forEach((item) => {
      l.push(`• ${item.qty}x ${item.name} — ${formatBRL(item.unitPrice * item.qty)}`);
      item.extras.forEach((e) => l.push(` ↳ ${e}`));
    });
    l.push("");
    l.push(`Subtotal ${cat.resumo}:`);
    l.push(`*${formatBRL(catSubtotal)}*`);
  }

  l.push("");
  l.push(SEP);
  l.push("");
  l.push("💳 *Forma de Pagamento*");
  l.push(customer.pagamento || "-");
  if (customer.pagamento === "Dinheiro" && customer.troco.trim()) {
    l.push("");
    l.push(`💵 Troco para: R$ ${customer.troco}`);
  }

  if (customer.observacoes.trim()) {
    l.push("");
    l.push(SEP);
    l.push("");
    l.push("📝 *Observações*");
    l.push(customer.observacoes.trim());
  }

  l.push("");
  l.push(SEP);
  l.push("");
  l.push("💰 *RESUMO DO PEDIDO*");
  for (const cat of CATEGORIAS) {
    if (subtotais[cat.kind] > 0) {
      l.push("");
      l.push(`${cat.resumo}:`);
      l.push(formatBRL(subtotais[cat.kind]));
    }
  }
  if (tipoPedido === "entrega") {
    l.push("");
    l.push("🚚 Taxa de entrega:");
    l.push(formatBRL(taxa));
  }

  l.push("");
  l.push(SEP);
  l.push("");
  l.push("✅ *TOTAL DO PEDIDO*");
  l.push(`*${formatBRL(total)}*`);

  l.push("");
  l.push(SEP);
  l.push("");
  l.push("🙏 Obrigado pela preferência!");
  l.push("Seu pedido foi enviado com sucesso e em instantes iniciaremos o preparo.");

  return l.join("\n");
}



export function openWhatsApp(message: string) {
  const url = `https://wa.me/${SEU_NUMERO_WHATSAPP}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}
