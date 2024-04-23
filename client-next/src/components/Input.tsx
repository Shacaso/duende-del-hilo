import { Client } from "@/app/lib/definitions";
import { DOMAttributes, FocusEventHandler, InputHTMLAttributes } from "react";

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
}

export default function Input({
  validate,
  title,
  placeholder,
  type,
  name,
  value,
  onChange,
  onBlur,
}: Props) {
  return (
    <div className='flex flex-col '>
      <div className='w-full flex justify-between items-center'>
        <label htmlFor={name}>{title}</label>
        {validate && <div className='badge badge-primary badge-sm'></div>}
      </div>
      <input
        className={`input input-bordered border ${
          validate && "border-primary border-2"
        }`}
        placeholder={placeholder}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  );
}
