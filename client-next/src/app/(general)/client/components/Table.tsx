// import PropTypes from 'prop-types';
import type { Client } from "@/app/lib/definitions";
import { TrashIcon, PencilAltIcon, ViewIcon } from "@/assets/svg";
// import { useProviders, useModal } from '@/hooks';
// import { TableSkeleton } from '@/components';
// import swal from 'sweetalert';
// import { UpdateProvider } from './UpdateProvider';

interface Props {
  data: Client[];
}

const headers = [
  "Nombre",
  "Apellido",
  "DNI",
  "Telefono",
  "Mail",
  // 'Direccion',
  "Departamento",
  // 'Codigo postal',
  "Acciones",
];

export function Table({ data }: Props) {
  // const { loading, deleteProvider } = useProviders();
  // const { openModal } = useModal();

  // const deleteProviderAlert = (id: number) => {
  //   swal({
  //     title: "Desea eliminar el proveedor",
  //     icon: "warning",
  //     buttons: {
  //       catch: {
  //         text: "Cancelar",
  //         value: null,
  //         className: "btn btn-accent",
  //       },
  //       default: {
  //         text: "Eliminar",
  //         value: true,
  //         className: "btn btn-primary",
  //       },
  //     },
  //   }).then((valueButtoms) => {
  //     if (valueButtoms) {
  //       deleteProvider(id);
  //       swal({
  //         title: "El proveedor fue eliminado",
  //         icon: "success",
  //       });
  //     }
  //   });
  // };

  return (
    <>
      {/* {loading ? (
        <TableSkeleton rows={5} headers={headers} />
      ) : ( */}
      <table className='table table-lg bg-base-200 [&>thead>tr]:text-lg '>
        <thead>
          <tr>
            {headers.map((headerItem: string, index: number) => (
              <th key={index}>{headerItem}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((client) => (
            <tr key={client.id}>
              <td>{client.name}</td>
              <td>{client.surname}</td>
              <td>{client.dni}</td>
              <td>{client.phoneNumber}</td>
              <td>{client.email}</td>
              <td>{client.departament}</td>
              <td className='flex gap-2'>
                <button
                  className='btn btn-circle btn-ghost'
                  // onClick={() => deleteProviderAlert(provider.id)}
                >
                  <TrashIcon />
                </button>
                <button
                  className='btn btn-circle btn-ghost'
                  // onClick={() =>
                  //   openModal(<UpdateProvider provider={provider} />)
                  // }
                >
                  <PencilAltIcon />
                </button>
                <button
                  className='btn btn-circle btn-ghost'
                  // onClick={() =>
                  //   openModal(<ProductDetail product={provider} />, {
                  //     className: "modal-product",
                  //   })
                  // }
                >
                  <ViewIcon />
                </button>
              </td>
            </tr>
          ))}
          {/* {data.map(provider => (
              <tr key={provider.id}>
                <td>{provider.name}</td>
                <td>{provider.company}</td>
                <td>{provider.phone}</td>
                <td>{provider.email}</td>
                <td className='flex gap-2'>
                  <button
                    className='btn btn-circle'
                    onClick={() => deleteProviderAlert(provider.id)}
                  >
                    <TrashIcon />
                  </button>
                  <button
                    className='btn btn-circle'
                    onClick={() =>
                      openModal(<UpdateProvider provider={provider} />)
                    }
                  >
                    <PencilAltIcon />
                  </button>
                </td>
              </tr>
            ))} */}
        </tbody>
      </table>
      {/* )} */}
    </>
  );
}
