import { RestaurantItem } from '../types/Restaurant';

type getMinPriceType = (restaurantItems: RestaurantItem[]) => number;

export const getMinPrice: getMinPriceType = (restaurantItems) => {
  if (!restaurantItems.length) return 0;

  const prices: number[] = restaurantItems.map(
    (restaurantItem: RestaurantItem) => restaurantItem.price,
  );

  return Math.min(...prices) || 0;
};
