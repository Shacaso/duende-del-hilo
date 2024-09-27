import { Costume, CountCostume } from "@/app/lib/definitions";
import { useCostume } from "@/hook/useCostume";
import { useFormik } from "formik";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
import { CostumeInputListItem } from "./CostumeInputListItem";

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

  const onSelectCostume = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      let costume = event.target.value;

      const isExist = costumes.find(
        (u) => `${u.name} - ${u.category.name}` === costume
      );

      if (isExist) {
        const newCostume: CountCostume = {
          cant: 1,
          costumeName: costume,
        };

        const updatedCostumes = [...costumeSelected, newCostume];
        setCostumeSelected(updatedCostumes);
        handleChangeCostume(updatedCostumes);
        event.target.value = "";
      }
    },
    [costumeSelected, costumes, handleChangeCostume]
  );

  const onChangeCant = useCallback(
    (event: ChangeEvent<HTMLInputElement>, elementIndex: number) => {
      const cant = Number(event.target.value);

      if (cant < 1) return;

      const updatedCostumes = costumeSelected.map((state, index) =>
        index === elementIndex
          ? { costumeName: state.costumeName, cant }
          : state
      );

      setCostumeSelected(updatedCostumes);
      handleChangeCostume(updatedCostumes);
    },
    [costumeSelected, handleChangeCostume]
  );

  const onDeleteCostume = useCallback(
    (elementIndex: number) => {
      const updatedCostumes = costumeSelected.filter(
        (_, index) => index !== elementIndex
      );
      setCostumeSelected(updatedCostumes);
      handleChangeCostume(updatedCostumes);
    },
    [costumeSelected, handleChangeCostume]
  );

  const onOpenModal = () => {
    setConfirmationModalOpen((prevState) => !prevState);
  };

  const costumePrices: number[] = useMemo(() => {
    return costumeSelected.map((costume) => {
      const costumeName = costume.costumeName.substring(
        0,
        costume.costumeName.indexOf(" -")
      );
      return costumes.find((u) => u.name === costumeName)?.category.price || 0;
    });
  }, [costumeSelected, costumes]);

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
        {costumeSelected.length > 0 && (
          <div className='flex gap-32'>
            <h1>Disfraz</h1>
            <h1>Cantidad</h1>
            <h1>Precio unitario</h1>
          </div>
        )}
        {costumeSelected.map((costume, index) => (
          <CostumeInputListItem
            key={index}
            costume={costume}
            index={index}
            costumePrice={costumePrices[index]}
            onChangeCant={onChangeCant}
            onDeleteCostume={onDeleteCostume}
          />
        ))}
      </div>
    </div>
  );
};
