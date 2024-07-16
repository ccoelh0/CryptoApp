export interface ICurrencyDTO {
  name: string;
  price: number;
  percentChange24h: number;
  priceIn?: "USD" | "ARS";
}

export class CryptoCurrencyDTO {
  name: string;

  price: number;

  percentChange24h: number;

  priceIn?: "USD" | "ARS";

  constructor(data: ICurrencyDTO) {
    this.name = data.name;
    this.price = data.price;
    this.priceIn = data?.priceIn || "USD";
    this.percentChange24h = data.percentChange24h;
  }
}
