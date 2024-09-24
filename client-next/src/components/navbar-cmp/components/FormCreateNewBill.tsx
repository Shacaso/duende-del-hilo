import Form from "@/app/(general)/client/components/Form";
import FormNewCostume from "@/app/(general)/costume/components/FormNewCostume";
import {
  Bill,
  BillDto,
  Client,
  Costume,
  CountCostume,
  Departament,
  Others,
} from "@/app/lib/definitions";
import { fetchGetAll, fetchPatch, fetchPost } from "@/app/lib/fetching";
import Input from "@/components/Input";
import ConfirmationModal from "@/components/modal-cmp/ConfirmationModal";
import { useClient } from "@/hook/useClient";
import { useCostume } from "@/hook/useCostume";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { z, ZodError } from "zod";
import { CostumeInputList } from "./CostumeInputList";
import { AccessoriesInputList } from "./AccessoriesInputList";

interface Props {
  data?: BillDto;
}

export default function FormCreateNewBill({ data }: Props) {
  const { getAllClients, clients } = useClient();
  const { getAllCostumes, costumes: costumesList } = useCostume();

  const [costumeSelected, setCostumeSelected] = useState<CountCostume[]>([]);

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
      others: data?.others ?? null,
      returned: data?.returned ?? "",
      amountTotal: data?.amountTotal ?? 0,
      costumes: data?.costumes ?? null,
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
      values.costumes = countCostumesList;
      values.others = accessories;
      console.log("Submit form: ", values);

      // if (!data) {
      //   fetchPost(values, "bills").then((res) => {
      //     if (res) {
      //       alert("La factura se ha guardado");
      //     }
      //   });
      // } else {
      //   fetchPatch(data.id, values, "bills").then((res) => {
      //     if (res) {
      //       alert("La factura se ha actualizado");
      //     }
      //   });
      // }
    },
  });

  interface Accessorie {
    id: number;
    name: string;
    price: number;
  }

  useEffect(() => {
    getAllClients();
    getAllCostumes();
  });

  const [accessories, setAccessories] = useState<Others[]>([]);

  const handleChangeAccessorie = (accessorios: Others[]) => {
    // console.log("HandleChangeAccessorie.accesorie", accessorios);
    setAccessories(accessorios);
  };

  const [countCostumesList, setCountCostumesList] = useState<CountCostume[]>(
    []
  );
  const handleChangeCostume = (costumes: CountCostume[]): void => {
    setCountCostumesList(costumes);
  };

  return (
    <>
      <form className='flex flex-col gap-5 w-full px-2' onSubmit={handleSubmit}>
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

        <div className='w-full h-1 bg-primary rounded-lg'></div>

        <CostumeInputList
          handleChangeCostume={handleChangeCostume}
          setConfirmationModalOpen={setConfirmationModalOpen}
        />

        <AccessoriesInputList handleChangeAccessorie={handleChangeAccessorie} />

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

        {/* <div className='flex flex-row gap-5'>
          <Input
            placeholder='Ingoeen precio total'
            validate={touched.amountTotal && errors.amountTotal ? true : false}
            title='Precio total'
            type='number'
            name='amountTotal'
            readOnly
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
        </div> */}
        <div className='w-full h-1 bg-primary rounded-lg'></div>
        <div className=''>
          <div className='flex gap-2 flex-col border-red-400 border-4'>
            <h1>Precio</h1>
            <div className='flex gap-2'>
              <input
                placeholder='Precio total'
                className='input input-md '
                type='number'
              />
              <input
                placeholder='A cuenta'
                className='input input-md '
                type='number'
              />
              <input
                placeholder='Saldo'
                className='input input-md '
                type='number'
              />
            </div>
          </div>
        </div>

        <div>
          <div className='flex gap-2 flex-col border-red-400 border-4'>
            <h1>Depósito</h1>
            <div className='flex gap-2'>
              <input
                placeholder='Depósito total'
                className='input input-md '
                type='number'
              />
              <input
                placeholder='A cuenta'
                className='input input-md '
                type='number'
              />
              <input
                placeholder='Saldo'
                className='input input-md '
                type='number'
              />
            </div>
          </div>
        </div>

        <div className='flex gap-2 border-red-400 border-4'>
          <Input
            placeholder='Ingrese descuento'
            validate={touched.amountTotal && errors.amountTotal ? true : false}
            title='Descuento en precio'
            type='number'
            name='amountTotal'
            // readOnly
            value={values.amountTotal}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <Input
            placeholder='Ingrese descuento'
            validate={touched.amountTotal && errors.amountTotal ? true : false}
            title='Descuento en depósito'
            type='number'
            name='amountTotal'
            // readOnly
            value={values.amountTotal}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </div>
        <div className='w-full h-1 bg-primary rounded-lg'></div>

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
