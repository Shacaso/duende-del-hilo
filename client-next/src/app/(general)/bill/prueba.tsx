import ReactPDF from "@react-pdf/renderer";
import { Bill } from "@/app/lib/definitions";
import { lazy } from "react";
import { PDFile } from "@/components/pdf/PDFile";

export const getPDF = async (bill: Bill) => {
  await ReactPDF.renderToFile(<PDFile data={bill} />, `./pdfs/recibo.pdf`);
  console.log("Se genera pdf");
};
