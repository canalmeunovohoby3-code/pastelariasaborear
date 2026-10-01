// ============================================================================
// CONFIGURAÇÃO — Pastelaria Nordestina
// ----------------------------------------------------------------------------
// Substitua o número abaixo pelo WhatsApp da atendente (somente dígitos, com
// código do país 55 e DDD). Ex.: "5581999999999"
// ============================================================================
export const SEU_NUMERO_WHATSAPP = "5575998744226";

export const NOME_PASTELARIA = "Pastel do Nordeste";
export const FRASE_IMPACTO = "O verdadeiro sabor nordestino em cada pastel.";

import pastelFrango from "@/assets/menu/pastel-frango.jpg";
import pastelFrangoQueijo from "@/assets/menu/pastel-frango-queijo.jpg";
import pastelFrangoCatupiry from "@/assets/menu/pastel-frango-catupiry.jpg";
import pastelFrangoCheddar from "@/assets/menu/pastel-frango-cheddar.jpg";
import pastelCarne from "@/assets/menu/pastel-carne.jpg";
import pastelCarneQueijo from "@/assets/menu/pastel-carne-queijo.jpg";
import pastelCalabresa from "@/assets/menu/pastel-calabresa.jpg";
import pastelPizza from "@/assets/menu/pastel-pizza.jpg";
import pastelNordestino from "@/assets/menu/pastel-nordestino.jpg";
import pastelEspecial from "@/assets/menu/pastel-especial.jpg";
import pastelCarneDeSol from "@/assets/menu/pastel-carnedesol.jpg";
import pastelArretado from "@/assets/menu/pastel-arretado.jpg";
import pastelChurrasco from "@/assets/menu/pastel-churrasco.jpg";
import pastelCamarao from "@/assets/menu/pastel-camarao.jpg";
import pastelao from "@/assets/menu/pastelao.jpg";
import pastelEstrogonofe from "@/assets/menu/pastel-estrogonofe.jpg";
import pastelBurger from "@/assets/menu/pastel-burger.jpg";
import pastelChocolate from "@/assets/menu/pastel-chocolate.jpg";
import acai from "@/assets/menu/acai.jpg";
import acai200 from "@/assets/menu/acai-200.jpg";
import acai350 from "@/assets/menu/acai-350.jpg";
import acai500 from "@/assets/menu/acai-500.jpg";
import sucos from "@/assets/menu/sucos.jpg";
import porcaoCarneMolho from "@/assets/menu/porcao-carne-molho.jpg";
import porcaoCarneAipim from "@/assets/menu/porcao-carne-aipim.jpg";
import porcaoCarneFritas from "@/assets/menu/porcao-carne-fritas.jpg";
import batataTradicional from "@/assets/menu/batata-tradicional.jpg";
import batataSaborear from "@/assets/menu/batata-saborear.jpg";
import bebidaCerveja from "@/assets/menu/bebida-cerveja.jpg";
import bebidaCervejaLata from "@/assets/menu/bebida-cerveja-lata.jpg";
import bebidaBrahma from "@/assets/menu/bebida-brahma.jpg";
import bebidaAmstel from "@/assets/menu/bebida-amstel.jpg";
import bebidaOriginal from "@/assets/menu/bebida-original.jpg";
import bebidaPrata from "@/assets/menu/bebida-prata.jpg";
import bebidaCorona from "@/assets/menu/bebida-corona.jpg";
import bebidaHeinekenLn from "@/assets/menu/bebida-heineken-ln.jpg";
import bebidaBudweiser from "@/assets/menu/bebida-budweiser.jpg";
import bebidaPrayaBeer from "@/assets/menu/bebida-praya.jpg";
import bebidaHeineken00 from "@/assets/menu/bebida-heineken-00.jpg";
import bebidaAmstelUltra from "@/assets/menu/bebida-amstel-ultra.jpg";
import bebidaImperioUltra from "@/assets/menu/bebida-imperio-ultra.jpg";
import bebidaItaipava from "@/assets/menu/bebida-itaipava.jpg";
import bebidaDrink from "@/assets/menu/bebida-drink.jpg";
import bebidaSmirnoffIce from "@/assets/menu/bebida-smirnoff-ice.jpg";
import bebidaCabareIce from "@/assets/menu/bebida-cabare-ice.jpg";
import bebidaCocaLata from "@/assets/menu/bebida-coca-lata.jpg";
import bebidaCocaZero from "@/assets/menu/bebida-coca-zero.jpg";
import bebidaPepsiLata from "@/assets/menu/bebida-pepsi-lata.jpg";
import bebidaKuat from "@/assets/menu/bebida-kuat.jpg";
import bebidaFantaLata from "@/assets/menu/bebida-fanta-lata.jpg";
import bebidaTubaina from "@/assets/menu/bebida-tubaina.jpg";
import bebidaRefriLata from "@/assets/menu/bebida-refri-lata.jpg";
import bebidaRefri1l from "@/assets/menu/bebida-refri-1l.jpg";
import bebidaCoca1l from "@/assets/menu/bebida-coca-1l.jpg";
import bebidaCocaZero1l from "@/assets/menu/bebida-coca-zero-1l.jpg";
import bebidaGuarana1l from "@/assets/menu/bebida-guarana-1l.jpg";
import bebidaGuaranaJesus1l from "@/assets/menu/bebida-guarana-jesus-1l.jpg";
import bebidaFanta1l from "@/assets/menu/bebida-fanta-1l.jpg";
import bebidaSoda1l from "@/assets/menu/bebida-soda-1l.jpg";
import bebidaSkinka from "@/assets/menu/bebida-skinka.jpg";
import bebidaSucoCaixa from "@/assets/menu/bebida-suco-caixa.jpg";
import bebidaAgua from "@/assets/menu/bebida-agua.jpg";
import bebidaAguaSg from "@/assets/menu/bebida-agua-sg.jpg";
import bebidaAguaCg from "@/assets/menu/bebida-agua-cg.jpg";
import bebidaVinho from "@/assets/menu/bebida-vinho.jpg";
import bebidaVinhoPergola from "@/assets/menu/bebida-vinho-pergola.jpg";
import salgadoCoxinhaFrango from "@/assets/menu/salgado-coxinha-frango.jpg";
import salgadoCoxinhaCostela from "@/assets/menu/salgado-coxinha-costela.jpg";
import salgadoRisoli from "@/assets/menu/salgado-risoli.jpg";
import salgadoEnroladinho from "@/assets/menu/salgado-enroladinho.jpg";
import espetinhoFrango from "@/assets/menu/espetinho-frango.jpg";
import espetinhoCamarao from "@/assets/menu/espetinho-camarao.jpg";

export type ProductKind = "pastel" | "acai" | "suco" | "porcao" | "bebida" | "salgado" | "espetinho";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number; // 0 = sob consulta
  image: string;
  kind: ProductKind;
}

export interface Borda {
  id: string;
  name: string;
  price: number;
}

export interface AcaiSize {
  id: string;
  name: string;
  price: number;
}

export const BORDAS: Borda[] = [
  { id: "catupiry", name: "Catupiry", price: 3 },
  { id: "cheddar", name: "Cheddar", price: 3 },
];

export const ACAI_TAMANHOS: AcaiSize[] = [
  { id: "200", name: "200 ml", price: 10 },
  { id: "350", name: "350 ml", price: 12 },
  { id: "500", name: "500 ml", price: 16 },
];

export const ACAI_IMAGENS: Record<string, string> = {
  "200": acai200,
  "350": acai350,
  "500": acai500,
};

export function getAcaiImage(sizeId: string): string {
  return ACAI_IMAGENS[sizeId] ?? acai;
}

export const ACAI_ACOMPANHAMENTOS = [
  "Banana",
  "Morango",
  "Leite em pó",
  "Leite condensado",
  "Granola",
  "Paçoca",
];
export const ACAI_MAX_ACOMPANHAMENTOS = 3;

export const FORMAS_PAGAMENTO = [
  "PIX",
  "Dinheiro",
  "Cartão de Débito",
  "Cartão de Crédito",
] as const;
export type FormaPagamento = (typeof FORMAS_PAGAMENTO)[number];

export const LOCAIS_ENTREGA = [
  { id: "lagoa", nome: "Povoado de Lagoa da Boa Vista", taxa: 2 },
  { id: "seabra", nome: "Seabra - BA", taxa: 7 },
] as const;
export type LocalEntregaId = (typeof LOCAIS_ENTREGA)[number]["id"];



export const PASTEIS: Product[] = [
  { id: "p-frango", name: "Frango", description: "Frango desfiado suculento e bem temperado.", price: 8, image: pastelFrango, kind: "pastel" },
  { id: "p-frango-queijo", name: "Frango com Queijo", description: "Frango desfiado e queijo mussarela.", price: 8, image: pastelFrangoQueijo, kind: "pastel" },
  { id: "p-frango-catupiry", name: "Frango com Catupiry", description: "Frango cremoso com catupiry original.", price: 8, image: pastelFrangoCatupiry, kind: "pastel" },
  { id: "p-frango-cheddar", name: "Frango com Cheddar", description: "Frango desfiado com cheddar cremoso.", price: 8, image: pastelFrangoCheddar, kind: "pastel" },
  { id: "p-carne", name: "Carne Moída", description: "Carne moída temperada na medida certa.", price: 8, image: pastelCarne, kind: "pastel" },
  { id: "p-carne-queijo", name: "Carne Moída com Queijo", description: "Carne moída e queijo mussarela.", price: 10, image: pastelCarneQueijo, kind: "pastel" },
  { id: "p-calabresa", name: "Calabresa com Queijo", description: "Calabresa e queijo mussarela.", price: 8, image: pastelCalabresa, kind: "pastel" },
  { id: "p-pizza", name: "Pizza", description: "Queijo mussarela, presunto, orégano e milho verde.", price: 8, image: pastelPizza, kind: "pastel" },
  { id: "p-nordestino", name: "Nordestino", description: "Purê de aipim, carne de sol e queijo mussarela.", price: 13, image: pastelNordestino, kind: "pastel" },
  { id: "p-especial", name: "Especial", description: "Carne, frango, calabresa, queijo mussarela, milho verde e escolha entre cheddar OU catupiry.", price: 13, image: pastelEspecial, kind: "pastel" },
  { id: "p-carnedesol", name: "Carne de Sol com Queijo", description: "Carne do sol e queijo mussarela.", price: 13, image: pastelCarneDeSol, kind: "pastel" },
  { id: "p-arretado", name: "Arretado", description: "Queijo mussarela, carne de sol e banana-da-terra.", price: 13, image: pastelArretado, kind: "pastel" },
  { id: "p-camarao", name: "Camarão", description: "Bobó de camarão cremoso e queijo mussarela.", price: 15, image: pastelCamarao, kind: "pastel" },
  { id: "p-pastelao", name: "Pastelão", description: "Pastel gigante com recheio farto de dar água na boca.", price: 15, image: pastelao, kind: "pastel" },
  { id: "p-estrogonofe", name: "Estrogonofe (Russo)", description: "Estrogonoff de frango, batata palha e queijo mussarela.", price: 13, image: pastelEstrogonofe, kind: "pastel" },
  { id: "p-churrasco", name: "Churrasco", description: "Carne assada, calabresa e queijo mussarela.", price: 15, image: pastelChurrasco, kind: "pastel" },
  { id: "p-burger", name: "Burger", description: "Pastel recheado com carne de hambúrguer artesanal e queijo mussarela.", price: 15, image: pastelBurger, kind: "pastel" },
  { id: "p-chocolate", name: "Chocolate", description: "Pastel doce recheado com chocolate ao leite.", price: 10, image: pastelChocolate, kind: "pastel" },
];

export const ACAI: Product = {
  id: "acai",
  name: "Açaí",
  description: "Açaí cremoso e gelado. Escolha o tamanho e até 3 acompanhamentos grátis.",
  price: 10,
  image: acai,
  kind: "acai",
};

export const SUCOS: Product = {
  id: "sucos",
  name: "Sucos Naturais",
  description: "Consulte os sabores disponíveis.",
  price: 0,
  image: sucos,
  kind: "suco",
};

export const PORCOES: Product[] = [
  { id: "por-carne-molho", name: "Carne com Molho de Queijo", description: "Carne de sol coberta com cremoso molho de queijo.", price: 50, image: porcaoCarneMolho, kind: "porcao" },
  { id: "por-carne-aipim", name: "Carne de Sol com Aipim", description: "Carne de sol acompanhada de aipim frito.", price: 50, image: porcaoCarneAipim, kind: "porcao" },
  { id: "por-carne-fritas", name: "Carne de Sol com Fritas", description: "Carne de sol com batata frita crocante. Acompanha salada e farofa.", price: 50, image: porcaoCarneFritas, kind: "porcao" },
  { id: "por-batata", name: "Batata Frita Tradicional", description: "Porção generosa de batata frita crocante — 300 gramas de batata.", price: 18, image: batataTradicional, kind: "porcao" },
  { id: "por-batata-saborear", name: "Batata Saborear", description: "Batata frita com cheddar, bacon e cebolinha.", price: 18, image: batataSaborear, kind: "porcao" },
];

export const SALGADOS: Product[] = [
  { id: "s-coxinha-frango", name: "Coxinha de Frango", description: "Coxinha crocante recheada com frango.", price: 6, image: salgadoCoxinhaFrango, kind: "salgado" },
  { id: "s-coxinha-costela", name: "Coxinha de Costela", description: "Coxinha crocante recheada com costela.", price: 7, image: salgadoCoxinhaCostela, kind: "salgado" },
  { id: "s-risoli", name: "Risoli de Queijo com Presunto", description: "Risoli crocante de queijo com presunto.", price: 6, image: salgadoRisoli, kind: "salgado" },
  { id: "s-enroladinho", name: "Enroladinho de Salsicha", description: "Enroladinho crocante de salsicha.", price: 6, image: salgadoEnroladinho, kind: "salgado" },
];

export const ESPETINHOS: Product[] = [
  { id: "e-frango", name: "Espetinho de Frango à Milanesa", description: "Espetinho de frango empanado à milanesa.", price: 8, image: espetinhoFrango, kind: "espetinho" },
  { id: "e-camarao", name: "Espetinho de Camarão à Milanesa", description: "Espetinho de camarão empanado à milanesa.", price: 10, image: espetinhoCamarao, kind: "espetinho" },
];




export const BEBIDAS: Product[] = [
  // Cervejas
  { id: "b-heineken", name: "Heineken 350 ml", description: "Cerveja Heineken lata 350 ml gelada.", price: 10, image: bebidaCerveja, kind: "bebida" },
  { id: "b-skol", name: "Skol 350 ml", description: "Cerveja Skol lata 350 ml.", price: 5, image: bebidaCervejaLata, kind: "bebida" },
  { id: "b-brahma", name: "Brahma", description: "Cerveja Brahma gelada.", price: 5, image: bebidaBrahma, kind: "bebida" },
  { id: "b-amstel", name: "Amstel", description: "Cerveja Amstel gelada.", price: 5, image: bebidaAmstel, kind: "bebida" },
  { id: "b-original", name: "Original", description: "Cerveja Original gelada.", price: 5, image: bebidaOriginal, kind: "bebida" },
  { id: "b-prata", name: "Prata", description: "Cerveja Prata gelada.", price: 10, image: bebidaPrata, kind: "bebida" },
  { id: "b-corona", name: "Corona 350 ml", description: "Cerveja Corona 350 ml.", price: 10, image: bebidaCorona, kind: "bebida" },
  { id: "b-heineken-ln", name: "Heineken Long Neck", description: "Heineken long neck gelada.", price: 10, image: bebidaHeinekenLn, kind: "bebida" },
  { id: "b-budweiser", name: "Budweiser 350 ml", description: "Cerveja Budweiser 350 ml.", price: 8, image: bebidaBudweiser, kind: "bebida" },
  { id: "b-praya", name: "Praya", description: "Cerveja Praya gelada.", price: 10, image: bebidaPrayaBeer, kind: "bebida" },
  { id: "b-heineken-00", name: "Heineken 0.0", description: "Heineken sem álcool.", price: 8, image: bebidaHeineken00, kind: "bebida" },
  { id: "b-amstel-ultra", name: "Amstel Ultra 350 ml", description: "Amstel Ultra 350 ml.", price: 6, image: bebidaAmstelUltra, kind: "bebida" },
  { id: "b-ultra-lata", name: "Ultra Lata 269 ml", description: "Cerveja Ultra lata 269 ml.", price: 5, image: bebidaImperioUltra, kind: "bebida" },
  { id: "b-cerveja-lata", name: "Cerveja Lata 350 ml", description: "Cerveja lata 350 ml.", price: 8, image: bebidaItaipava, kind: "bebida" },
  // Drinks
  { id: "b-ice", name: "Ice", description: "Bebida Ice gelada.", price: 10, image: bebidaSmirnoffIce, kind: "bebida" },
  { id: "b-cabare", name: "Cabaré", description: "Drink Cabaré.", price: 10, image: bebidaCabareIce, kind: "bebida" },
  // Refrigerantes e Sucos
  { id: "b-coca-lata", name: "Coca-Cola Lata 350 ml", description: "Coca-Cola lata 350 ml.", price: 5, image: bebidaCocaLata, kind: "bebida" },
  { id: "b-coca-zero-lata", name: "Coca-Cola Zero Lata 350 ml", description: "Coca-Cola Zero lata 350 ml.", price: 5, image: bebidaCocaZero, kind: "bebida" },
  { id: "b-pepsi-lata", name: "Pepsi Lata 350 ml", description: "Pepsi lata 350 ml.", price: 5, image: bebidaPepsiLata, kind: "bebida" },
  { id: "b-kuat", name: "Guaraná Kuat Lata", description: "Guaraná Kuat lata.", price: 5, image: bebidaKuat, kind: "bebida" },
  { id: "b-fanta-lata", name: "Fanta Lata (Laranja ou Uva)", description: "Fanta lata laranja ou uva.", price: 5, image: bebidaFantaLata, kind: "bebida" },
  { id: "b-tubaina", name: "Tubaína", description: "Refrigerante Tubaína.", price: 6, image: bebidaTubaina, kind: "bebida" },
  { id: "b-coca-1l", name: "Coca-Cola 1 Litro", description: "Coca-Cola 1 litro.", price: 8, image: bebidaCoca1l, kind: "bebida" },
  { id: "b-coca-zero-1l", name: "Coca-Cola Zero 1 Litro", description: "Coca-Cola Zero 1 litro.", price: 8, image: bebidaCocaZero1l, kind: "bebida" },
  { id: "b-guarana-1l", name: "Guaraná 1 Litro", description: "Guaraná 1 litro.", price: 8, image: bebidaGuarana1l, kind: "bebida" },
  { id: "b-guarana-jesus-1l", name: "Guaraná Jesus 1 Litro", description: "Guaraná Jesus 1 litro.", price: 8, image: bebidaGuaranaJesus1l, kind: "bebida" },
  { id: "b-fanta-1l", name: "Fanta 1 Litro", description: "Fanta 1 litro.", price: 8, image: bebidaFanta1l, kind: "bebida" },
  { id: "b-soda-1l", name: "Soda Limonada 1 Litro", description: "Soda Limonada 1 litro.", price: 8, image: bebidaSoda1l, kind: "bebida" },
  { id: "b-skinka", name: "Suco Skinka (Laranja, Uva ou Morango)", description: "Suco Skinka laranja, uva ou morango.", price: 5, image: bebidaSkinka, kind: "bebida" },
  // Águas
  { id: "b-agua-sg", name: "Água sem gás", description: "Água mineral sem gás.", price: 3, image: bebidaAguaSg, kind: "bebida" },
  { id: "b-agua-cg", name: "Água com gás", description: "Água mineral com gás.", price: 4, image: bebidaAguaCg, kind: "bebida" },
  // Vinho
  { id: "b-vinho-pergola", name: "Vinho Pérgola (Taça)", description: "Taça de vinho Pérgola.", price: 10, image: bebidaVinhoPergola, kind: "bebida" },
];

export function formatBRL(value: number): string {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
