import { deleteAction } from "@/app/lib/data/funciones";
import { Client } from "@/app/lib/definitions";
import ConfirmationModal from "@/components/modal-cmp/ConfirmationModal";
import React, { useState } from "react";
import Form from "./Form";

interface Props {
	data?: Client;
}

export default function View({ data }: Props) {
	const [updateModalOpen, setUpdateModalOpen] = useState<boolean>(false);

	return (
		<>
			<div className="flex flex-col h-full">
				<div className="flex-1 flex flex-col gap-3  h-full">
					{/* <p className='text-lg'>{data?.id}</p> */}
					<p className="text-xl">
						<span className="font-bold">Nombre:</span> {data?.name}
					</p>
					<p className="text-xl">
						<span className="font-bold">Apellido:</span> {data?.surname}
					</p>
					<p className="text-xl">
						<span className="font-bold">Dni:</span> {data?.dni}
					</p>
					<p className="text-xl">
						<span className="font-bold">Numero de celular:</span>{" "}
						{data?.phoneNumber}
					</p>
					<p className="text-xl">
						<span className="font-bold">Email:</span> {data?.email}
					</p>
					<p className="text-xl">
						<span className="font-bold">Direccion:</span> {data?.direction}
					</p>
					<p className="text-xl">
						<span className="font-bold">Departamento:</span> {data?.departament}
					</p>
					<p className="text-xl">
						<span className="font-bold">Codigo postal:</span> {data?.postalCode}
					</p>
					{/* <p className='text-xl'>Lista negra: {data?.blacklist}</p> */}
				</div>
				<div className="flex p-5 gap-5 justify-end">
					<button
						onClick={() => deleteAction(data?.id ?? "", "clients")}
						className="btn btn-primary"
					>
						Delete
					</button>
					<button
						onClick={() => {
							setUpdateModalOpen(!updateModalOpen);
						}}
						className="btn btn-secondary"
					>
						Update
					</button>
				</div>
			</div>
			{updateModalOpen && (
				<ConfirmationModal
					title="UPDATE CLIENT"
					isOpen={updateModalOpen}
					handleClose={() => setUpdateModalOpen(!updateModalOpen)}
				>
					<div className="overflow-auto h-[462px]">
						<Form data={data} />
					</div>
				</ConfirmationModal>
			)}
		</>
	);
}
