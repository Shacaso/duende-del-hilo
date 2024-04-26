import ReactPDF from "@react-pdf/renderer";
import { Bill } from "@/app/lib/definitions";
import { PDFile } from "../pdf/components/PDFile";

export const getPDF = async (bill: Bill) => {
	await ReactPDF.renderToFile(<PDFile data={bill} />, `./pdfs/recibo.pdf`);
	console.log("Se genera pdf");
};
