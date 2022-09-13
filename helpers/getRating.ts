import { Review } from '../types/Restaurant';

type getRatingType = (reviews: Review[], reviewsAmount: number) => number;

export const getRating: getRatingType = (reviews, reviewsAmount) => {
  const allRatings = reviews.reduce((acc: number, review: Review) => review.rating + acc, 0);

  return allRatings / reviewsAmount || 0;
};
