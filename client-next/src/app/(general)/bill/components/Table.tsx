// import PropTypes from 'prop-types';
import { Bill, Client, Costume, CostumeCant } from "@/app/lib/definitions";
import { fetchGetById } from "@/app/lib/fetching";
import { PrintIcon, TrashIcon, ViewIcon } from "@/assets/svg";
import { PDFViewer } from "@react-pdf/renderer";
import { PDFile } from "@/components/pdf/PDFile";
import { useAppDispatch } from "@/lib/store";
import { useBill } from "@/hook/useBill";
import Swal from "sweetalert2";
import { useEffect, useMemo, useState } from "react";
import { useReactToPrint } from "react-to-print";
// import swal from 'sweetalert';

interface Props {
  data: Bill[];
  showTotal: boolean;
}

export function Table({ data, showTotal }: Props) {
  const { changeReturnedBill } = useBill();

  const fixDate = (date: string) => {
    return date.split("-").reverse().join("/");
  };
  const fixCostumes = (costumes: CostumeCant[]) => {
    return costumes
      .slice(-2)
      .map((costume: CostumeCant, index: number): string => {
        if (index === costumes.length - 1) {
          return costume.costume.name;
          // } else if (costumes.length >= 3) {
          //   return costume.costume.name + "... ";
        } else {
          return `${costume.costume.name}${index === 1 ? "..." : ", "}`;
        }
      });
  };

  const handleChangeReturned = ({ id, returned }: Bill) => {
    if (returned) return;
    Swal.fire({
      title: `¿Disfraz devuelto?`,
      text: "",
      icon: "warning",
      showCancelButton: true,
      showDenyButton: true,
      focusConfirm: true,
      confirmButtonText: "Si",
      denyButtonText: "Archivado",
      cancelButtonText: "No",
      customClass: {
        confirmButton: "btn text-white btn-success text-lg",
        denyButton: "btn btn-primary text-lg ",
        cancelButton: "btn bg-slate-300 text-lg",
      },
    }).then((values) => {
      // console.log(values);

      if (values.isDenied) {
        Swal.fire({
          title: `Archivado`,
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
        return;
      }

      if (values.isDismissed) {
        Swal.fire({
          title: `Okay, seguimos esperando`,
          icon: "info",
          timer: 2000,
          showConfirmButton: false,
        });
        return;
      }

      Swal.showLoading();
      changeReturnedBill({ id, returned });
    });
  };

  const handlePrint = () => {
    Swal.fire("Impreso", "", "success");
  };

  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Calcular el total sumando el precio de todos los items
    const totalSum = data.reduce((acc, item) => acc + item.precioTotal, 0);

    // Actualizar el estado solo una vez con el total calculado
    setTotal(totalSum);
  }, [data]); // Dependencia: se recalcula cuando `data` cambia

  return (
    <div className='overflow-x-auto'>
      <table className=' table table-lg bg-base-200  [&>thead>tr>th]:text-xl [&>thead>tr>th]:font-bold  '>
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
          {data.map((bill) => {
            return (
              <tr className='hover:bg-base-300   text-lg' key={bill.id}>
                <td>
                  <button
                    onClick={() => handleChangeReturned(bill)}
                    className={`btn btn-square btn-sm    ${
                      bill.returned ? "btn-success" : " btn-primary"
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
                <td>{fixCostumes(bill.costumes)}</td>

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
                  <button onClick={handlePrint} className='btn btn-circle'>
                    <PrintIcon />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
        {showTotal && (
          <tfoot>
            <tr>
              <th>
                <h3 className='text-xl font-bold'>Total: {total}</h3>
              </th>
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
}
