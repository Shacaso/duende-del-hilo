// import PropTypes from 'prop-types';
import { Bill, Client } from "@/app/lib/definitions";
import { fetchGetById } from "@/app/lib/fetching";
import { PencilAltIcon, ViewIcon } from "@/assets/svg";
import { PDFViewer } from "@react-pdf/renderer";
import { PDFile } from "../../pdf/components/PDFile";
// import swal from 'sweetalert';

interface Props {
  data: Bill[];
}

export function Table({ data }: Props) {
  return (
    <table className='table table-lg bg-base-200 [&>thead>tr]:text-lg '>
      <thead>
        <tr>
          <th>Devuelto</th>
          <th>N` Factura</th>
          <th>Fecha</th>
          <th>Nombre</th>
          <th>Monto</th>
          <th>DNI</th>
          <th>Disfraces comprados</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data.map((bill) => {
          return (
            <tr key={bill.id}>
              <td>
                <div
                  className={`badge badge-lg ${
                    bill.returned ? "badge-success" : "badge-primary"
                  }`}
                ></div>
              </td>
              <td> {bill.billNumber}</td>
              <td>{bill.date}</td>
              <td>{bill.client?.name + " " + bill.client?.surname}</td>
              <td>{bill.amountTotal}</td>
              <td>{bill.client?.dni}</td>
              <td>
                {bill.costumes.map((costume, index) => {
                  if (index === bill.costumes.length - 1) {
                    return costume.name;
                  } else {
                    return costume.name + ", ";
                  }
                })}
              </td>

              <td>
                <button
                  className='btn btn-circle'
                  onClick={() => {
                    document.getElementById(bill.id).showModal();
                  }}
                >
                  <ViewIcon />
                </button>
                <dialog id={bill.id} className='modal'>
                  <div className='modal-box w-11/12 max-w-5xl'>
                    <form method='dialog'>
                      {/* if there is a button in form, it will close the modal */}
                      <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>
                        ✕
                      </button>
                    </form>
                    <div className='p-4'>
                      <PDFViewer style={{ width: "100%", height: "100vh" }}>
                        <PDFile data={bill} />
                      </PDFViewer>
                    </div>
                  </div>
                </dialog>
                <button
                  className='btn btn-circle'
                  // onClick={() => {
                  //   swal({
                  //     text: "Agregar comentario, decir si se ha devulto",
                  //   });
                  // }
                  // }
                >
                  <PencilAltIcon />
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
