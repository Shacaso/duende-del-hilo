import PropTypes from 'prop-types';
import { TrashIcon, PencilAltIcon, ViewIcon } from '@/assets/svg';
import { useProviders, useModal } from '@/hooks';
import { TableSkeleton } from '@/components';
import swal from 'sweetalert';
import { UpdateProvider } from './UpdateProvider';

export function Table({ data }) {
  const { loading, deleteProvider } = useProviders();
  const { openModal } = useModal();
  const headers = [
    'Nombre',
    'Apellido',
    'DNI',
    'Telefono',
    'Mail',
    // 'Direccion',
    'Departamento',
    // 'Codigo postal',
    'Acciones',
  ];

  const deleteProviderAlert = id => {
    swal({
      title: 'Desea eliminar el proveedor',
      icon: 'warning',
      buttons: {
        catch: {
          text: 'Cancelar',
          value: null,
          className: 'btn btn-accent',
        },
        default: {
          text: 'Eliminar',
          value: true,
          className: 'btn btn-primary',
        },
      },
    }).then(valueButtoms => {
      if (valueButtoms) {
        deleteProvider(id);
        swal({
          title: 'El proveedor fue eliminado',
          icon: 'success',
        });
      }
    });
  };

  return (
    <>
      {loading ? (
        <TableSkeleton rows={5} headers={headers} />
      ) : (
        <table className='table table-lg bg-base-200 [&>thead>tr]:text-lg '>
          <thead>
            <tr>
              {headers.map((h, i) => (
                <th key={i}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Ximena</td>
              <td>Morales</td>
              <td>34789234</td>
              <td>2613456780</td>
              <td>ximena@gmail.com</td>
              <td>Ciudad</td>
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
                <button
                  className='btn btn-circle'
                  onClick={() =>
                    openModal(<ProductDetail product={provider} />, {
                      className: 'modal-product',
                    })
                  }
                >
                  <ViewIcon />
                </button>
              </td>
            </tr>
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
      )}
    </>
  );
}
Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any),
};
