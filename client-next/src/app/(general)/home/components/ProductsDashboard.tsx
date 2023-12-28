import { ViewIcon } from "@/assets/svg";
// import { useProducts, useModal } from '@/hooks/';
// import { TableSkeleton } from '@/components';
// import { ProductDetail } from './ProductDetail';

export default function ProductsDashboard() {
  const headers = ["N`Factura", "Fecha", "Nombre", "Acciones"];

  return (
    <>
      {/* {loading ? (
        <TableSkeleton rows={6} headers={headers} />
      ) : ( */}
      <table className='table bg-base-200 table-lg [&>thead>tr]:text-lg '>
        <thead>
          <tr>
            {headers.map((header: string, index: number) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>0001</td>
            <td>13/11/2023</td>
            <td>Nombre</td>
            <td>
              <button
              // onClick={() =>
              //   openModal(<ProductDetail product={product} />, {
              //     title: '',
              //     className: 'modal-product',
              //   })
              // }
              >
                <ViewIcon />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      {/* )} */}
    </>
  );
}
