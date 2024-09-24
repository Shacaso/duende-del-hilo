import { Costume, CountCostume } from "@/app/lib/definitions";
import { useCostume } from "@/hook/useCostume";
import { useFormik } from "formik";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

interface Props {
  handleChangeCostume: (costumes: CountCostume[]) => void;
  setConfirmationModalOpen: Dispatch<SetStateAction<boolean>>;
}

export const CostumeInputList = ({
  handleChangeCostume,
  setConfirmationModalOpen,
}: Props) => {
  const { costumes } = useCostume();

  const [costumeSelected, setCostumeSelected] = useState<CountCostume[]>([]);

  const onSelectCostume = (event: ChangeEvent<HTMLInputElement>) => {
    let costume = event.target.value;

    const isExist = costumes.find(
      (u) => `${u.name} - ${u.category.name}` === costume
    );

    if (isExist) {
      const newCostume: CountCostume = {
        cant: 1,
        costumeName: costume,
      };

      setCostumeSelected((prevState) => [...prevState, newCostume]);
      handleChangeCostume([...costumeSelected, newCostume]);
      event.target.value = "";
    }
  };

  const onChangeCant = (
    event: ChangeEvent<HTMLInputElement>,
    elementIndex: number
  ) => {
    const cant = Number(event.target.value);

    if (cant < 1) return;

    setCostumeSelected((prevState) =>
      prevState.map((state, index) =>
        index === elementIndex
          ? { costumeName: state.costumeName, cant }
          : state
      )
    );
    handleChangeCostume(
      costumeSelected.map((state, index) =>
        index === elementIndex
          ? { costumeName: state.costumeName, cant }
          : state
      )
    );
  };

  const onDeleteCostume = (elementIndex: number) => {
    setCostumeSelected((prevState) =>
      prevState.filter((_, index) => index !== elementIndex)
    );

    handleChangeCostume(
      costumeSelected.filter((_, index) => index !== elementIndex)
    );
  };

  const onOpenModal = () => {
    setConfirmationModalOpen((prevState) => !prevState);
  };

  return (
    <div className='flex gap-5 flex-col bg-slate-200 p-2 rounded-lg'>
      <div className='flex justify-between'>
        <h6 className='font-bold'>Disfraces</h6>
        <button
          type='button'
          onClick={onOpenModal}
          className='btn btn-primary btn-sm'
        >
          CREAR DISFRAZ
        </button>
      </div>
      <div className='flex-1'>
        <label>
          <input
            list='costumes'
            name='costumes'
            className='w-full input input-bordered '
            placeholder='Elegir disfraces'
            onChange={onSelectCostume}
          />
        </label>
        <datalist id='costumes'>
          {costumes
            .filter((item) => item.dischargeDate === "")
            .map(({ id, name, category }: Costume) => (
              <option key={id} value={`${name} - ${category.name}`}></option>
            ))}
        </datalist>
      </div>
      <div className='w-full rounded-lg bg-neutral p-2 gap-2 flex flex-col'>
        {costumeSelected.map((costume, index) => (
          <div key={index} className='flex gap-2 items-center'>
            <input
              placeholder='Disfraz'
              className='input input-sm'
              type='text'
              value={costume.costumeName}
              readOnly
            />
            <input
              placeholder='Cantidad'
              className='input input-sm'
              type='number'
              value={costume.cant}
              onChange={(event) => onChangeCant(event, index)}
            />
            <button
              type='button'
              onClick={() => onDeleteCostume(index)}
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
