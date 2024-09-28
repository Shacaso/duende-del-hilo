import { Client } from "@/app/lib/definitions";
import { FormikErrors } from "formik";
import { DOMAttributes, FocusEventHandler, InputHTMLAttributes } from "react";
import Swal from "sweetalert2";

interface Props {
  validate?: boolean;
  title?: string;
  errors: FormikErrors<string>;
  placeholder?: string;
  type?: string;
  list?: string;
  readOnly?: boolean;
  name?: string;
  value?: string | number;
  onChange?: {
    (e: React.ChangeEvent<any>): void;
    <T_1 = string | React.ChangeEvent<any>>(
      field: T_1
    ): T_1 extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
  onBlur?: {
    (e: React.FocusEvent<any, Element>): void;
    <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
  };
}

const handleError = (errors: FormikErrors<string>) => {
  Swal.fire({
    title: "Error",
    icon: "error",
    text: errors,
    customClass: {
      confirmButton: "btn btn-primary btn-wide",
    },
  });
};

export default function Input({
  validate,
  errors,
  title,
  list,
  placeholder,
  type,
  name,
  value,
  onChange,
  readOnly = false,
  onBlur,
}: Props) {
  return (
    <div className='flex flex-col '>
      <div className='w-full flex justify-between items-center'>
        <label htmlFor={name}>{title}</label>
        {validate && (
          <div
            onClick={() => handleError(errors)}
            className='hover:cursor-pointer badge badge-primary badge-sm'
          ></div>
        )}
      </div>
      <input
        className={`w-full input input-bordered border ${
          validate && "border-primary border-2"
        }`}
        placeholder={placeholder}
        readOnly={readOnly}
        type={type}
        name={name}
        list={list}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  );
}
