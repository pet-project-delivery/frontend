export interface RestaurantItem {
  _id: string;
  name: string;
  imageUrl: string;
  category: string;
  restaurant: string;
  weight: number;
  calories: number;
  price: number;
}

export interface Review {
  _id: string;
  text: string;
  restaurant: string;
  rating: number;
}

export interface Category {
  _id: string;
  name: string;
  restaurant: string;
}

export interface Restaurant {
  _id: string;
  name: string;
  imageUrl: string;
  timeRange: string;
  type: 'restaurant' | 'shop';
  reviewsAmount: number;
  minPrice: number;
  items: RestaurantItem[];
  reviews: Review[];
  categories: Category[];
}
