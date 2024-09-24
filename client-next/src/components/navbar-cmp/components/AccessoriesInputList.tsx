import { Others } from "@/app/lib/definitions";
import { ChangeEvent, useState } from "react";

interface Props {
  handleChangeAccessorie: (accessorios: Others[]) => void;
}

export const AccessoriesInputList = ({ handleChangeAccessorie }: Props) => {
  const [accessories, setAccessories] = useState<Others[]>([]);

  const onAddAccessories = () => {
    const newAccessorie: Others = {
      name: "",
      price: 0,
    };

    setAccessories((prevState) => [...prevState, newAccessorie]);
  };

  const onDeleteAccessories = (idAccessorie: number) => {
    setAccessories((prevState) =>
      prevState.filter((_, index) => idAccessorie !== index)
    );
  };

  const onChange = (
    index: number,
    field: keyof Others,
    value: string | number
  ) => {
    if (typeof value === "number" && value < 0) return;

    const updatedProducts = [...accessories];
    updatedProducts[index] = {
      ...updatedProducts[index],
      [field]: value,
    };
    setAccessories(updatedProducts);
    handleChangeAccessorie(updatedProducts);
  };

  return (
    <div className='flex gap-5 flex-col bg-slate-200 p-2 rounded-lg'>
      <div className='flex justify-between'>
        <h6 className='font-bold'>ACCESORIOS/OTROS</h6>
        <button
          type='button'
          onClick={onAddAccessories}
          className='btn btn-primary btn-sm'
        >
          AGREGAR
        </button>
      </div>
      <div className='w-full rounded-lg bg-neutral p-2 gap-2 flex flex-col'>
        {accessories.map((acc, index) => (
          <div key={index} className='flex gap-2 items-center'>
            <input
              placeholder='Nombre'
              className='input input-sm'
              type='text'
              onChange={(event) => onChange(index, "name", event.target.value)}
              name='name'
              value={acc.name}
            />
            <input
              placeholder='Precio'
              className='input input-sm'
              type='number'
              onChange={(event) =>
                onChange(index, "price", Number(event.target.value))
              }
              name='price'
              value={acc.price}
            />
            <button
              type='button'
              onClick={() => onDeleteAccessories(index)}
              className='btn btn-xs btn-primary'
            >
              BORRAR
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
