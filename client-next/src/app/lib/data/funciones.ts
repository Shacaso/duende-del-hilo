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
};
