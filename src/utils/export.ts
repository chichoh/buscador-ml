import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Product } from '../types';
import { getKilometraje } from './product';

export const exportToExcel = (products: Product[]) => {
  const worksheet = XLSX.utils.json_to_sheet(
    products.map(product => ({
      'Producto': product.title,
      'Precio': product.price,
      'Vendedor': product.seller.nickname,
      'Reputación': product.seller.seller_reputation?.level_id || 'Sin datos',
      'Enlace': product.permalink,
      'Kilometraje': getKilometraje(product.attributes)
    }))
  );

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Productos');
  XLSX.writeFile(workbook, 'productos_mercadolibre.xlsx');
};

export const exportToPDF = (products: Product[]) => {
  const doc = new jsPDF();

  const tableData = products.map(product => [
    product.title,
    `$${product.price.toLocaleString()}`,
    product.seller.nickname,
    product.seller.seller_reputation?.level_id || 'Sin datos',
    getKilometraje(product.attributes)
  ]);

  autoTable(doc, {
    head: [['Producto', 'Precio', 'Vendedor', 'Reputación', 'Kilometraje']],
    body: tableData,
    styles: { fontSize: 8 },
    headStyles: { fillColor: [59, 130, 246] }
  });

  doc.save('productos_mercadolibre.pdf');
};