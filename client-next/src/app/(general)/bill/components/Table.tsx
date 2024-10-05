// import PropTypes from 'prop-types';
import { Bill, Client, Costume, CostumeCant } from "@/app/lib/definitions";
import { fetchGetById } from "@/app/lib/fetching";
import { TrashIcon, ViewIcon } from "@/assets/svg";
import { PDFViewer } from "@react-pdf/renderer";
import { PDFile } from "@/components/pdf/PDFile";
// import swal from 'sweetalert';

interface Props {
  data: Bill[];
  showTotal: boolean;
}

export function Table({ data, showTotal }: Props) {
  const fixDate = (date: string) => {
    return date.split("-").reverse().join("/");
  };

  return (
    <table className='table table-lg bg-base-200 [&>thead>tr>th]:text-xl [&>thead>tr>th]:font-bold  '>
      <thead>
        <tr className=' border-slate-100 border-b-4 '>
          <th></th>
          <th>N. Fact.</th>
          <th>Fecha dev.</th>
          <th>Nombre completo</th>
          <th>Precio total</th>
          {/* <th>DNI</th> */}
          <th>Disfraces alquilados</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody className='[&>tr>td]:text-xl'>
        {data.map((bill) => (
          <tr className='hover:bg-base-300 text-lg' key={bill.id}>
            <td>
              <button
                className={`btn btn-square btn-sm    ${
                  bill.returned ? "btn-success" : "btn-primary"
                }`}
              ></button>
            </td>
            <td> {bill.billNumber}</td>
            <td>{fixDate(bill.returnedDate)}</td>
            <td>
              <span className='font-bold'>{bill.client?.surname}</span>,{" "}
              {bill.client?.name}
            </td>
            <td>{bill.precioTotal}</td>
            {/* <td>{bill.client?.dni}</td> */}
            <td>
              {bill.costumes.map(
                (costume: CostumeCant, index: number): string => {
                  if (index === bill.costumes.length - 1) {
                    return costume.costume.name;
                  } else {
                    return costume.costume.name + ", ";
                  }
                }
              )}
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
            </td>
          </tr>
        ))}
      </tbody>
      {showTotal && (
        <tfoot>
          <tr>
            <th>
              <h3 className='text-xl font-bold'>Total: xxx</h3>
            </th>
          </tr>
        </tfoot>
      )}
    </table>
  );
}
