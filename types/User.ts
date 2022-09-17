import { Restaurant } from "./Restaurant";

export interface User {
  _id: string;
  email: string;
  password: string;
  likedShops: Restaurant[];
  likedRestaurants: Restaurant[];
}
