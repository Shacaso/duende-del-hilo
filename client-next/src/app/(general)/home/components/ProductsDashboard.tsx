"use client";

import { Bill } from "@/app/lib/definitions";
import { ViewIcon } from "@/assets/svg";
import { useBill } from "@/hook/useBill";
import { PDFViewer } from "@react-pdf/renderer";
import { useEffect } from "react";
import { PDFile } from "../../../../components/pdf/PDFile";
// import { useProducts, useModal } from '@/hooks/';
// import { TableSkeleton } from '@/components';
// import { ProductDetail } from './ProductDetail';

export default function ProductsDashboard() {
  const { getAllBills, bills } = useBill();
  const headers = ["N`Factura", "Nombre completo", "Total", "Ver"];

  useEffect(() => {
    getAllBills();
  });

  return (
    <>
      {/* {loading ? (
        <TableSkeleton rows={6} headers={headers} />
      ) : ( */}
      <table className='table table-pin-rows bg-base-200 table-lg [&>thead>tr]:text-lg '>
        <thead>
          <tr>
            {headers.map((header: string, index: number) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.isArray(bills) &&
            bills
              .slice(-5)
              .reverse()
              .map((bill: Bill) => (
                <tr key={bill.id}>
                  <td>{bill.billNumber}</td>
                  <td>
                    {bill.client.name} {bill.client.surname}
                  </td>
                  <td>{bill.precioTotal}</td>
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
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
      {/* )} */}
    </>
  );
}
