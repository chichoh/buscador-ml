import React from 'react';
import { Product } from '../types';

interface ProductTableProps {
  products: Product[];
}

export default function ProductTable({ products }: ProductTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border rounded-lg">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Producto</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendedor</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reputación</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kilometraje</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {products.map((product) => {
            const kmAttribute = product.attributes.find(
              attr => attr.id === 'KILOMETERS' || attr.name.toLowerCase().includes('kilometraje')
            );

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
                  ${product.price.toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  {product.seller.nickname}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    product.seller.seller_reputation.level_id === '5_green' ? 'bg-green-100 text-green-800' :
                    product.seller.seller_reputation.level_id === '4_light_green' ? 'bg-green-50 text-green-700' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {product.seller.seller_reputation.level_id.split('_').join(' ')}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {kmAttribute ? kmAttribute.value_name : 'N/A'}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}