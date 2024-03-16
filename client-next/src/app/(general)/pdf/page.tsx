"use client";

import { PDFViewer } from "@react-pdf/renderer";
import { useState } from "react";
import { PDFile } from "./components/PDFile";
import { Bill } from "@/app/lib/definitions";

interface Props {
	data: Bill;
}

export default function PdfPage({ data }: Props) {
	const [verPDF, setVerPDF] = useState(false);

	return (
		<div className="flex flex-col w-full">
			<button
				onClick={() => {
					setVerPDF(!verPDF);
				}}
				className="btn btn-primary btn-wide"
			>
				{verPDF ? "OCULTAR PDF" : "VER DOCUMENTO"}
			</button>
			{/* <button className='btn btn-success btn-wide'
          onClick={() =>
            openModal(
              <PDFViewer style={{ width: '100%', height: '70vh' }}>
                <PDFile />
              </PDFViewer>,
              {
                title: 'Nuevo Disfraz',
                className: 'modal-product',
              }
            )
          }
        >
          {' '}
          ABRIR MODAL
        </button> */}

			{verPDF && (
				<PDFViewer style={{ width: "100%", height: "90vh" }}>
					<PDFile data={data} />
				</PDFViewer>
			)}
			{/* <PDFile /> */}
		</div>
	);
}
