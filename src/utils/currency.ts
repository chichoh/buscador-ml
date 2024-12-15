import { Product } from '../types';

export async function getBlueDollarRate(): Promise<number> {
  try {
    const response = await fetch('https://api.bluelytics.com.ar/v2/latest');
    const data = await response.json();
    return data.blue.value_sell;
  } catch (error) {
    console.error('Error fetching blue dollar rate:', error);
    return 0;
  }
}

export function shouldConvertToBlueRate(product: Product): boolean {
  const isCarCategory = product.category_id?.startsWith('MLA1744'); // MLA1744 is the cars category
  return isCarCategory && product.price < 500000;
}

export function formatPrice(price: number, blueDollarRate: number | null = null): string {
  return `$${price.toLocaleString()}${blueDollarRate ? ` (USD ${(price / blueDollarRate).toFixed(2)})` : ''}`;
}