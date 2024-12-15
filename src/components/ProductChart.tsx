import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Product } from '../types';

interface ProductChartProps {
  products: Product[];
}

export default function ProductChart({ products }: ProductChartProps) {
  const data = products.map(product => ({
    name: product.title.slice(0, 30) + '...',
    precio: product.price
  }));

  return (
    <div className="h-[500px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="precio" fill="#3B82F6" name="Precio" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}