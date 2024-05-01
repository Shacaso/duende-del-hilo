import Form from "@/app/(general)/client/components/Form";
import FormNewCostume from "@/app/(general)/costume/components/FormNewCostume";
import {
  Bill,
  BillDto,
  Client,
  Costume,
  Departament,
} from "@/app/lib/definitions";
import { fetchGetAll, fetchPatch, fetchPost } from "@/app/lib/fetching";
import Input from "@/components/Input";
import ConfirmationModal from "@/components/modal-cmp/ConfirmationModal";
import { useClient } from "@/hook/useClient";
import { useCostume } from "@/hook/useCostume";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { z, ZodError } from "zod";

interface Props {
  data?: BillDto;
}

export default function FormCreateNewBill({ data }: Props) {
  const { getAllClients, clients } = useClient();
  const { getAllCostumes, costumes: costumesList } = useCostume();

  const [costumeSelected, setCostumeSelected] = useState<string[]>([]);

  const [confirmationModalOpen, setConfirmationModalOpen] =
    useState<boolean>(false);
  const [confirmationClientModalOpen, setConfirmationClientModalOpen] =
    useState<boolean>(false);

  const {
    initialValues,
    handleSubmit,
    values,
    handleChange,
    errors,
    touched,
    handleBlur,
  } = useFormik({
    initialValues: {
      id: data?.id ?? "",
      billNumber: data?.billNumber ?? 0,
      date: data?.date ?? "",
      returned: data?.returned ?? "",
      amountTotal: data?.amountTotal ?? 0,
      costumes: data?.costumes ?? costumeSelected,
      dniClient: data?.dniClient ?? "",
      note: data?.note ?? "",
      dischargeDate: data?.dischargeDate ?? "",
      returnedDate: data?.returnedDate ?? "",
      retirementDate: data?.retirementDate ?? "",
      advancement: data?.advancement ?? 0,
      remainingBalance: data?.remainingBalance ?? 0,
    },
    // validate: (values) => {
    //   try {
    //     billSchema.parse(values);
    //   } catch (error) {
    //     if (error instanceof ZodError) return error.formErrors.fieldErrors;
    //   }
    // },
    onSubmit: (values) => {
      values.dniClient = Number(values.dniClient.toString().split(" ")[0]);
      // console.log(values);

      if (!data) {
        fetchPost(values, "bills").then((res) => {
          if (res) {
            alert("La factura se ha guardado");
          }
        });
      } else {
        fetchPatch(data.id, values, "bills").then((res) => {
          if (res) {
            alert("La factura se ha actualizado");
          }
        });
      }
    },
  });

  const handleChangeData = (e: { target: { value: any } }) => {
    let costume = e.target.value;
    // document.addEventListener("keydown", ({ key }) => {
    //   if (key === "Backspace") {
    //     e.target.value = "";
    //     return;
    //   }
    // });
    costume = costume.split(" ");
    if (costume[1] !== "-") {
      return;
    }
    if (costume[0] !== "") {
      values.costumes.push(costume[0]);
      values.amountTotal += Number(costume[2].substr(1));
      setCostumeSelected(costume[0]);
      e.target.value = "";
    }
  };

  const handleDelete = (index: number, value: string) => {
    const costumeUpdate = values.costumes.splice(index, 1);
    const costume = costumesList.filter(
      (item: Costume) => item.name === value
    )[0];
    values.amountTotal -= costume.price;
    setCostumeSelected(costumeUpdate);
  };

  useEffect(() => {
    getAllClients();
    getAllCostumes();
  });

  return (
    <>
      <form className='flex flex-col gap-5 w-full px-2' onSubmit={handleSubmit}>
        <div className='gap-3 flex-col flex'>
          <label>Listado de disfraces</label>
          <div className='h-52 w-full bg-base-100 flex flex-wrap gap-2 py-2 px-1'>
            {values.costumes.map((item, index) => (
              <div key={index} className='badge badge-primary gap-2 p-4'>
                {item}
                <svg
                  onClick={() => handleDelete(index, item)}
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  className='inline-block w-4 h-4 stroke-current'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M6 18L18 6M6 6l12 12'
                  ></path>
                </svg>
              </div>
            ))}
          </div>
        </div>

        {touched.costumes && errors.costumes && <p>{errors.costumes}</p>}
        <div className='flex gap-5 items-center justify-center'>
          <div className='w-full'>
            <label>
              <input
                list='costumes'
                name='costumes'
                className='w-full input input-bordered '
                placeholder='Elegir disfraces'
                onBlur={handleBlur}
                onChange={handleChangeData}
                // onSelect={() => handleSelect}
              />
            </label>
            <datalist id='costumes'>
              {costumesList.map((item: Costume) => (
                <option
                  key={item.id}
                  value={`${item.name} - $${item.price}`}
                ></option>
              ))}
            </datalist>
          </div>
          <button
            type='button'
            onClick={() => setConfirmationModalOpen(!confirmationModalOpen)}
            className='btn  btn-primary btn-xs h-full'
          >
            +
          </button>
        </div>

        {touched.amountTotal && errors.amountTotal && (
          <p>{errors.amountTotal}</p>
        )}
        <label>Precio total</label>
        <input
          className='w-full input input-bordered h-full'
          placeholder='amountTotal'
          type='number'
          name='amountTotal'
          value={values.amountTotal}
          onBlur={handleBlur}
          onChange={handleChange}
        />

        <div className='flex flex-row gap-5'>
          <div className='flex flex-col gap-3'>
            {touched.advancement && errors.advancement && (
              <p>{errors.advancement}</p>
            )}
            <label>Seña</label>
            <input
              className='w-full input input-bordered h-full'
              placeholder='Ingrese seña'
              type='number'
              name='advancement'
              value={values.advancement}
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </div>

          <div className='flex flex-col gap-3'>
            <label className='text-orange-400'>Depósito</label>
            <input
              className='w-full input input-bordered h-full'
              placeholder='Ingrese depósito'
              type='number'
              name='advancement'
              value={values.advancement}
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </div>
        </div>

        {touched.dniClient && errors.dniClient && <p>{errors.dniClient}</p>}
        <div className='flex gap-5 items-center justify-center'>
          <div className='flex-1'>
            <label>Cliente</label>
            <label>
              <input
                list='users'
                name='dniClient'
                className='w-full input input-bordered '
                placeholder='Buscar clientes'
                value={values.dniClient}
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </label>
            <datalist id='users'>
              {clients.map((item) => (
                <option
                  key={item.dni}
                  value={`${item.dni} - ${item.name} ${item.surname}`}
                ></option>
              ))}
            </datalist>
          </div>

          <button
            type='button'
            onClick={() =>
              setConfirmationClientModalOpen(!confirmationClientModalOpen)
            }
            className='btn h-full btn-primary btn-xs'
          >
            +
          </button>
        </div>

        {touched.note && errors.note && <p>{errors.note}</p>}
        <label>Notas</label>
        <input
          className='w-full input input-bordered h-full'
          placeholder='Ingrese notas'
          type='text'
          name='note'
          value={values.note}
          onBlur={handleBlur}
          onChange={handleChange}
        />

        <div className='flex flex-row gap-5'>
          <div className='flex flex-col gap-3 w-full'>
            <Input
              placeholder='Ingrese fecha de devolución'
              validate={
                touched.returnedDate && errors.returnedDate ? true : false
              }
              title='Fecha de devolución'
              type='date'
              name='returnedDate'
              value={values.returnedDate}
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </div>

          <div className='flex flex-col gap-3 w-full'>
            <Input
              placeholder='Ingrese fecha de devolución'
              validate={
                touched.retirementDate && errors.retirementDate ? true : false
              }
              title='Fecha de retiro'
              type='date'
              name='retirementDate'
              value={values.retirementDate}
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </div>
        </div>

        <button className='btn btn-primary' type='submit'>
          GUARDAR
        </button>
      </form>
      {confirmationModalOpen && (
        <ConfirmationModal
          title='CREAR DISFRAZ'
          isOpen={confirmationModalOpen}
          handleClose={() => setConfirmationModalOpen(!confirmationModalOpen)}
        >
          <div className='overflow-auto h-[462px]'>
            <FormNewCostume />
          </div>
        </ConfirmationModal>
      )}
      {confirmationClientModalOpen && (
        <ConfirmationModal
          title='CREAR CLIENTE'
          isOpen={confirmationClientModalOpen}
          handleClose={() =>
            setConfirmationClientModalOpen(!confirmationClientModalOpen)
          }
        >
          <div className='overflow-auto h-[462px]'>
            <Form />
          </div>
        </ConfirmationModal>
      )}
    </>
  );
}
