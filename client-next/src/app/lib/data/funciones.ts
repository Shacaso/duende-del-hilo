import { CostumeCant, Others } from "../definitions";
import { fetchDeleteById } from "../fetching";

//Funcion que concatena los mesajes de error de las validaciones
export function jsonProcess(data: any[]) {
	let output = "";
	for (let index = 0; index < data.length; index++) {
		output += data[index].message + ". ";
	}
	return output;
}

export const deleteAction = async (id: string, path: string) => {
	const result = window.confirm("¿Seguro que desea eliminar el registro?");

	if (result) {
		await fetchDeleteById(id, path).then((res) => {
			if (res) alert("Registro eliminado");
		});
	}
	location.reload();
};

export function getDateAndHour() {
	const fechaHora: Date = new Date();
	fechaHora.setHours(fechaHora.getHours() - 3);
	const [date, time] = fechaHora.toISOString().split("T");
	const [hour, b] = time.split(".");

	return { date, hour };
}

export function sacarPrecioTotal(
	costumesFound: CostumeCant[],
	others: Others[] | null
) {
	let resultado = 0;
	costumesFound.forEach(({ costume, cant }: CostumeCant) => {
		resultado += costume.category.price * cant;
	});
	if (others && others.length !== 0) {
		others.forEach(({ price, cant }: Others) => {
			resultado += price * cant;
		});
	}
	return resultado;
}
