import { Restaurant } from "./Restaurant";

export interface Promo {
  _id: string;
  name: string;
  promocode: string;
  url: string;
  restaurants: Restaurant[];
}
