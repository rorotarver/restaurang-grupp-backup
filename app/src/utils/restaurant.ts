const FALLBACK_RESTAURANT_ID = '6996f44b1f79230601108db6';

export const getRestaurantIdOrThrow = (): string => {
  const restaurantId = process.env.NEXT_PUBLIC_RESTAURANT_ID || FALLBACK_RESTAURANT_ID;

  if (!restaurantId) {
    throw new Error('NEXT_PUBLIC_RESTAURANT_ID saknas i .env.local');
  }

  return restaurantId;
};
