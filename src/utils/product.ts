import { ProductAttribute } from '../types';

export const getKilometraje = (attributes: ProductAttribute[]): string => {
  const kmAttribute = attributes.find(
    attr => attr.id === 'KILOMETERS' || attr.name.toLowerCase().includes('kilometraje')
  );
  return kmAttribute?.value_name || 'N/A';
};