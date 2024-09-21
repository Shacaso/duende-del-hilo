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
    console.log("handleChangeData, input:", { costume: e.target.value });

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
      // TODO values.amountTotal += Number(costume[2].substr(1));
      setCostumeSelected(costume[0]);
      e.target.value = "";
      console.log("handleChangeData, output:", {
        costume1: costume[0],
        costume2: costume[1],
        costume3: costume[2],
      });
    }
  };

  const handleDelete = (index: number, value: string) => {
    console.log("handleDelete, input:", { index, value });

    const costumeUpdate = values.costumes.splice(index, 1);
    const costume = costumesList.filter(
      (item: Costume) => item.name === value
    )[0];
    values.amountTotal -= costume.price;
    setCostumeSelected(costumeUpdate);
    console.log("handleDelete, output:", { costumeUpdate });
  };

  interface Accessorie {
    id: number;
    name: string;
    price: number;
  }

  useEffect(() => {
    getAllClients();
    getAllCostumes();
  });

  const [accessories, setAccessories] = useState<Accessorie[]>([]);

  const onAddAccessories = () => {
    const newAccessorie: Accessorie = {
      id:
        accessories.length !== 0
          ? accessories[accessories.length - 1].id + 1
          : 1,
      name: "",
      price: 0,
    };
    console.log("onAddAccessories");

    console.log("newAccessorie", newAccessorie);
    const newState = [...accessories, newAccessorie];
    console.log("newState", newState);

    setAccessories(newState);
  };
  const onDeleteAccessories = (idAccessorie: number) => {
    const accessoriesFiltered = accessories.filter(
      (acc) => acc.id !== idAccessorie
    );
    setAccessories(accessoriesFiltered);
  };

  return (
    <>
      <form className='flex flex-col gap-5 w-full px-2' onSubmit={handleSubmit}>
        <div className='gap-3 flex-col flex'>
          <label>Listado de disfraces</label>
          <div className='min-h-32 h-full w-full bg-base-100 flex flex-wrap gap-x-2 gap-y-1 py-2 px-1'>
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
          <div className='flex-1'>
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
              {costumesList
                .filter((item) => item.dischargeDate === "")
                .map(({ id, name, category }: Costume) => (
                  <option key={id} value={`${name} - ${category}`}></option>
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

        <div className='flex gap-5 flex-col bg-slate-200 p-2 rounded-lg'>
          <div className='flex justify-between'>
            <h6 className='font-bold'>ACCESORIOS/OTROS</h6>
            <button
              type='button'
              onClick={onAddAccessories}
              className='btn btn-primary btn-xs'
            >
              +
            </button>
          </div>
          <div className='w-full rounded-lg bg-slate-400 p-2 gap-2 flex flex-col'>
            {accessories.map((acc) => (
              <div key={acc.id} className='flex gap-2 items-center'>
                <input
                  placeholder='Nombre'
                  className='input input-sm'
                  type='text'
                />
                <input
                  placeholder='Precio'
                  className='input input-sm'
                  type='text'
                />
                <button
                  type='button'
                  onClick={() => onDeleteAccessories(acc.id)}
                  className='btn btn-xs btn-primary'
                >
                  -
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className='flex flex-row gap-5'>
          <Input
            placeholder='Ingrese precio total'
            validate={touched.amountTotal && errors.amountTotal ? true : false}
            title='Precio total'
            type='number'
            name='amountTotal'
            value={values.amountTotal}
            onBlur={handleBlur}
            onChange={handleChange}
          />

          <div className='border-4 border-red-300 '>
            <Input
              validate={
                touched.amountTotal && errors.amountTotal ? true : false
              }
              title='Depósito total'
              placeholder='Ingrese depósito total'
              type='number'
              name='amountTotal'
              value={values.amountTotal}
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </div>
        </div>
        <hr />
        <div className='flex flex-row gap-5'>
          <Input
            placeholder='Ingrese seña'
            validate={touched.advancement && errors.advancement ? true : false}
            title='Seña'
            type='number'
            name='advancement'
            value={values.advancement}
            onBlur={handleBlur}
            onChange={handleChange}
          />

          <div className='border-4 border-red-300 '>
            <Input
              validate={
                touched.advancement && errors.advancement ? true : false
              }
              title='Depósito'
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
                className='w-full input input-bordered '
                list='users'
                name='dniClient'
                placeholder='Buscar clientes'
                value={values.dniClient}
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </label>
            <datalist id='users'>
              {clients
                .filter((item) => item.dischargeDate === "")
                .map((item) => (
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

        <Input
          placeholder='Ingrese notas'
          validate={touched.note && errors.note ? true : false}
          title='Notas'
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
        </div>

        <button className='btn btn-success text-white' type='submit'>
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
