import Form from "@/app/(general)/client/components/Form";
import FormNewCostume from "@/app/(general)/costume/components/FormNewCostume";
import { BillDto, CountCostume, Others } from "@/app/lib/definitions";
import Input from "@/components/Input";
import ConfirmationModal from "@/components/modal-cmp/ConfirmationModal";
import { useClient } from "@/hook/useClient";
import { useCostume } from "@/hook/useCostume";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { AccessoriesInputList } from "./AccessoriesInputList";
import { CostumeInputList } from "./CostumeInputList";

interface Props {
  data?: BillDto;
}

export default function FormCreateNewBill({ data }: Props) {
  const { getAllClients, clients } = useClient();
  const { getAllCostumes /* , costumes: costumesList */ } = useCostume();

  // const [costumeSelected, setCostumeSelected] = useState<CountCostume[]>([]);

  const [confirmationModalOpen, setConfirmationModalOpen] =
    useState<boolean>(false);
  const [confirmationClientModalOpen, setConfirmationClientModalOpen] =
    useState<boolean>(false);

  const { handleSubmit, values, handleChange, errors, touched, handleBlur } =
    useFormik({
      initialValues: {
        id: data?.id ?? "",
        billNumber: data?.billNumber ?? 0,
        date: data?.date ?? "",
        others: data?.others ?? null,
        returned: data?.returned ?? "",
        amountTotal: data?.amountTotal ?? 0,
        demoPrecioACuenta: 0,
        demoPrecioSaldo: 0,
        demoDepositoTotal: 0,
        demoDepositoACuenta: 0,
        demoDepositoSaldo: 0,
        demoDescuentoPrecio: 0,
        demoDescuentoDeposito: 0,
        costumes: data?.costumes ?? 0,
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

        // values.demoPrecioSaldo = values.amountTotal - values.demoPrecioACuenta;
        // values.demoDepositoSaldo =
        //   values.demoDepositoTotal - values.demoDepositoACuenta;

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

  useEffect(() => {
    getAllClients();
    getAllCostumes();
  });

  const [accessories, setAccessories] = useState<Others[]>([]);

  const handleChangeAccessorie = (accessorios: Others[]) => {
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
        {/* <div className='flex gap-5 flex-col bg-slate-200 p-2 rounded-lg'>
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
        </label> */}
        {touched.dniClient && errors.dniClient && <p>{errors.dniClient}</p>}
        <div className='flex gap-5 flex-col bg-slate-200 p-2 rounded-lg'>
          <div className='flex justify-between'>
            <h6 className='font-bold'>Cliente</h6>
            <button
              type='button'
              onClick={() =>
                setConfirmationClientModalOpen(!confirmationClientModalOpen)
              }
              className='btn btn-primary btn-sm'
            >
              CREAR CLIENTE
            </button>
          </div>

          <div className='flex-1'>
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
        <div className='grid grid-cols-3 bg-slate-200 p-4 rounded-lg '>
          <div className='flex gap-2 flex-col  col-span-3'>
            {/* <h1>Precio</h1> */}
            <div className='flex gap-2'>
              <Input
                title='Precio total'
                value={values.amountTotal}
                placeholder='Precio total'
                name='amountTotal'
                type='number'
                onChange={handleChange}
                onBlur={handleBlur}
                validate={
                  touched.amountTotal && errors.amountTotal ? true : false
                }
              />
              <Input
                title='A cuenta'
                value={values.demoPrecioACuenta}
                placeholder='A cuenta'
                name='demoPrecioACuenta'
                type='number'
                onChange={handleChange}
                onBlur={handleBlur}
                validate={
                  touched.demoPrecioACuenta && errors.demoPrecioACuenta
                    ? true
                    : false
                }
              />
              <Input
                title='Saldo precio'
                value={values.amountTotal - values.demoPrecioACuenta}
                placeholder='Saldo'
                readOnly
                name='demoPrecioSaldo'
                type='number'
                onChange={handleChange}
                onBlur={handleBlur}
                validate={
                  touched.demoPrecioSaldo && errors.demoPrecioSaldo
                    ? true
                    : false
                }
              />
            </div>
            <Input
              placeholder='Ingrese descuento'
              validate={
                touched.demoDescuentoPrecio && errors.demoDescuentoPrecio
                  ? true
                  : false
              }
              title='Descuento en precio'
              type='number'
              name='demoDescuentoPrecio'
              // readOnly
              value={values.demoDescuentoPrecio}
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </div>
          <div className='w-full h-1 bg-slate-300 rounded-lg col-span-3  mt-3 mb-2'></div>

          <div className='flex gap-2 flex-col  col-span-3'>
            {/* <h1>Depósito</h1> */}
            <div className='flex gap-2'>
              <Input
                title='Depósito total'
                value={values.demoDepositoTotal}
                placeholder='Depósito total'
                name='demoDepositoTotal'
                type='number'
                onChange={handleChange}
                onBlur={handleBlur}
                validate={
                  touched.demoDepositoTotal && errors.demoDepositoTotal
                    ? true
                    : false
                }
              />
              <Input
                title='A cuenta'
                value={values.demoDepositoACuenta}
                placeholder='A cuenta'
                name='demoDepositoACuenta'
                type='number'
                onChange={handleChange}
                onBlur={handleBlur}
                validate={
                  touched.demoDepositoACuenta && errors.demoDepositoACuenta
                    ? true
                    : false
                }
              />
              <Input
                title='Saldo deposito'
                value={values.demoDepositoTotal - values.demoDepositoACuenta}
                placeholder='Saldo'
                readOnly
                name='demoDepositoSaldo'
                type='number'
                onChange={handleChange}
                onBlur={handleBlur}
                validate={
                  touched.demoDepositoSaldo && errors.demoDepositoSaldo
                    ? true
                    : false
                }
              />
            </div>
            <Input
              placeholder='Ingrese descuento'
              validate={
                touched.demoDescuentoDeposito && errors.demoDescuentoDeposito
                  ? true
                  : false
              }
              title='Descuento en depósito'
              type='number'
              name='demoDescuentoDeposito'
              // readOnly
              value={values.demoDescuentoDeposito}
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </div>
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
