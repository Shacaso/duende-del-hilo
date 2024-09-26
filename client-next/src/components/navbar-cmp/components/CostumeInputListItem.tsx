import { Costume, CountCostume } from "@/app/lib/definitions";
import React, { ChangeEvent, memo } from "react";
interface Props {
  costume: CountCostume;
  index: number;
  costumePrice: number;
  onChangeCant: (
    event: ChangeEvent<HTMLInputElement>,
    elementIndex: number
  ) => void;
  onDeleteCostume: (elementIndex: number) => void;
}

// eslint-disable-next-line react/display-name
export const CostumeInputListItem = memo(
  ({ costume, index, costumePrice, onChangeCant, onDeleteCostume }: Props) => {
    return (
      <div className='flex gap-2 items-center'>
        <input
          placeholder='Disfraz'
          className='input input-sm w-40'
          type='text'
          value={costume.costumeName}
          readOnly
        />
        <input
          placeholder='Cantidad'
          className='input input-sm w-40'
          type='number'
          value={costume.cant}
          onChange={(event) => onChangeCant(event, index)}
        />
        <input
          placeholder='Precio'
          className='input input-sm w-40 border-red-400 border-4'
          type='number'
          readOnly
          value={costumePrice}
        />
        <button
          type='button'
          onClick={() => onDeleteCostume(index)}
          className='btn btn-xs btn-primary'
        >
          BORRAR
        </button>
      </div>
    );
  }
);
