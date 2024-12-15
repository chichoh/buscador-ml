import React, { useEffect, useState } from 'react';
import { Product } from '../../types';
import { ReputationBadge } from './ReputationBadge';
import { getKilometraje } from '../../utils/product';
import { getBlueDollarRate, shouldConvertToBlueRate, formatPrice } from '../../utils/currency';

interface ProductTableRowProps {
  product: Product;
}

export function ProductTableRow({ product }: ProductTableRowProps) {
  const [blueDollarRate, setBlueDollarRate] = useState<number | null>(null);
  const [displayPrice, setDisplayPrice] = useState(product.price);

  useEffect(() => {
    const checkAndConvertPrice = async () => {
      if (shouldConvertToBlueRate(product)) {
        const rate = await getBlueDollarRate();
        if (rate) {
          setBlueDollarRate(rate);
          setDisplayPrice(product.price * rate);
        }
      }
    };
    
    checkAndConvertPrice();
  }, [product]);

  return (
    <tr key={product.id}>
      <td className="px-6 py-4">
        <div className="flex items-center">
          <img src={product.thumbnail} alt={product.title} className="w-12 h-12 object-cover mr-4" />
          <a
            href={product.permalink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800"
          >
            {product.title}
          </a>
        </div>
      </td>
      <td className="px-6 py-4">
        {formatPrice(displayPrice, blueDollarRate)}
        {blueDollarRate && (
          <div className="text-xs text-gray-500 mt-1">
            Convertido al dólar blue
          </div>
        )}
      </td>
      <td className="px-6 py-4">
        {product.seller.nickname}
      </td>
      <td className="px-6 py-4">
        <ReputationBadge reputation={product.seller.seller_reputation} />
      </td>
      <td className="px-6 py-4">
        {getKilometraje(product.attributes)}
      </td>
    </tr>
  );
}