import { ViewIcon } from '@/assets/svg';
import { useProducts, useModal } from '@/hooks/';
import { TableSkeleton } from '@/components';
import { ProductDetail } from './ProductDetail';

export function ProductsDashboard() {
  const { products, loading } = useProducts();
  const { openModal } = useModal();
  const headers = ['N`Factura', 'Fecha', 'Nombre', 'Acciones'];

  return (
    <>
      {loading ? (
        <TableSkeleton rows={6} headers={headers} />
      ) : (
        <table className='table bg-base-200 table-lg [&>thead>tr]:text-lg '>
          <thead>
            <tr>
              {headers.map((h, i) => (
                <th key={i}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>0001</td>
              <td>13/11/2023</td>
              <td>Nombre</td>
              <td><button 
                    onClick={() =>
                      openModal(<ProductDetail product={product} />, {
                        title: '',
                        className: 'modal-product',
                      })
                    }
                  >
                    <ViewIcon />
                  </button></td>
            </tr>
            {/* {products.slice(-7).map(product => (
              <tr key={product.id}>
                <td>{product.nombre}</td>
                <td>
                  <div className='w-12 h-12 mask mask-squircle'>
                    <img src={product.imagen} alt='Imagen' />
                  </div>
                </td>
                <td className='flex gap-5'>
                  <button
                    onClick={() =>
                      openModal(<ProductDetail product={product} />, {
                        title: '',
                        className: 'modal-product',
                      })
                    }
                  >
                    <ViewIcon />
                  </button>
                </td>
              </tr>
            ))} */}
          </tbody>
        </table>
      )}
    </>
  );
}
