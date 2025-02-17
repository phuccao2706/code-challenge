export interface IPriceData {
    currency: string;
    date: string;
    price: number;
  }
  
  export interface IPrices {
    [key: string]: number;
  }
  