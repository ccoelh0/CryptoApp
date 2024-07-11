interface ITopCryptoCurrency {
  name: string;
  price: number;
  variation24hs: number;
  priceIn: "USD" | "ARS";
}

export class TopCryptoCurrencyDTO {
  name: string;

  price: number;

  variation24hs: number;

  priceIn: "USD" | "ARS";

  constructor(data: ITopCryptoCurrency) {
    this.name = data.name;
    this.price = data.price;
    this.priceIn = data.priceIn;
    this.variation24hs = data.variation24hs;
  }
}

export interface ITopCurrencyDTO extends TopCryptoCurrencyDTO {}
