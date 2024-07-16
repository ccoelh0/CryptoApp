interface ITopCryptoCurrency {
  name: string;
  price: number;
  percentChange24h: number;
  priceIn?: "USD" | "ARS";
}

export class TopCryptoCurrencyDTO {
  name: string;

  price: number;

  percentChange24h: number;

  priceIn?: "USD" | "ARS";

  constructor(data: ITopCryptoCurrency) {
    this.name = data.name;
    this.price = data.price;
    this.priceIn = data?.priceIn || "USD";
    this.percentChange24h = data.percentChange24h;
  }
}

export interface ITopCurrencyDTO extends TopCryptoCurrencyDTO {}
