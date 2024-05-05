import { Departament } from "@/app/lib/definitions";

interface Props {
  validate: boolean;
  title: string;
  placeholder: string;
  type: string;
  name: string;
  value: string | number;
  onChange: {
    (e: React.ChangeEvent<any>): void;
    <T_1 = string | React.ChangeEvent<any>>(
      field: T_1
    ): T_1 extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
  onBlur: {
    (e: React.FocusEvent<any, Element>): void;
    <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
  };
  data: Departament[];
  list: string;
}

export default function InputDataList({
  validate,
  title,
  placeholder,
  type,
  name,
  value,
  onChange,
  onBlur,
  data,
  list,
}: Props) {
  return (
    <div className='flex flex-col w-full  '>
      <div className='w-full flex justify-between items-center'>
        <label htmlFor={name}>{title}</label>
        {validate && <div className='badge badge-primary badge-sm'></div>}
      </div>
      <label>
        <input
          className={`input input-bordered border w-full ${
            validate && "border-primary border-2"
          }`}
          placeholder={placeholder}
          type={type}
          list={list}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
      </label>
      <datalist id={list}>
        {data?.map(({ id, name }: Departament) => (
          <option key={id} value={name}></option>
        ))}
      </datalist>
    </div>
  );
}
