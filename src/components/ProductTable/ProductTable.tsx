import React, { useState } from 'react';
import { Product } from '../../types';
import { ProductTableRow } from './ProductTableRow';
import { Calculator } from 'lucide-react';
import { shouldConvertToBlueRate, getBlueDollarRate } from '../../utils/currency';

interface ProductTableProps {
  products: Product[];
}

export function ProductTable({ products }: ProductTableProps) {
  const [showTotal, setShowTotal] = useState(false);
  const [total, setTotal] = useState(0);

  React.useEffect(() => {
    const calculateTotal = async () => {
      let sum = 0;
      const blueDollarRate = await getBlueDollarRate();
      
      for (const product of products) {
        if (shouldConvertToBlueRate(product) && blueDollarRate) {
          sum += product.price * blueDollarRate;
        } else {
          sum += product.price;
        }
      }
      
      setTotal(sum);
    };

    calculateTotal();
  }, [products]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <button
          onClick={() => setShowTotal(!showTotal)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Calculator size={20} />
          {showTotal ? 'Ocultar Total' : 'Calcular Total'}
        </button>
        
        {showTotal && (
          <div className="text-lg font-semibold bg-indigo-50 text-indigo-700 px-6 py-3 rounded-lg">
            Total: ${total.toLocaleString()}
          </div>
        )}
      </div>

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
            {products.map((product) => (
              <ProductTableRow key={product.id} product={product} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}