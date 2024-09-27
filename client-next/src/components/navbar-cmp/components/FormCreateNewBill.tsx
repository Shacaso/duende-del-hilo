import Form from "@/app/(general)/client/components/Form";
import FormNewCostume from "@/app/(general)/costume/components/FormNewCostume";
import { BillDto, CountCostume, Others } from "@/app/lib/definitions";
import Input from "@/components/Input";
import ConfirmationModal from "@/components/modal-cmp/ConfirmationModal";
import { useClient } from "@/hook/useClient";
import { useCostume } from "@/hook/useCostume";
import { useFormik } from "formik";
import { ChangeEvent, useEffect, useState } from "react";
import { AccessoriesInputList } from "./AccessoriesInputList";
import { CostumeInputList } from "./CostumeInputList";

interface Props {
  data?: BillDto;
}

export default function FormCreateNewBill({ data }: Props) {
  const { getAllClients, clients } = useClient();
  const { getAllCostumes, costumes: costumesList } = useCostume();

  // const [costumeSelected, setCostumeSelected] = useState<CountCostume[]>([]);

  const [confirmationModalOpen, setConfirmationModalOpen] =
    useState<boolean>(false);
  const [confirmationClientModalOpen, setConfirmationClientModalOpen] =
    useState<boolean>(false);

  const {
    handleSubmit,
    values,
    handleChange,
    errors,
    touched,
    handleBlur,
    setStatus,
  } = useFormik({
    initialValues: {
      id: data?.id ?? "",
      billNumber: data?.billNumber ?? 0,
      date: data?.date ?? "",
      others: data?.others ?? null,
      returned: data?.returned ?? "",
      precioTotal: data?.precioTotal ?? 0,
      precioACuenta: data?.precioACuenta ?? 0,
      precioSaldo: data?.precioSaldo ?? 0,
      depositoTotal: data?.depositoTotal ?? 0,
      depositoACuenta: data?.depositoACuenta ?? 0,
      depositoSaldo: data?.depositoSaldo ?? 0,
      precioDescuento: data?.precioDescuento ?? 0,
      depositoDescuento: data?.depositoDescuento ?? 0,
      costumes: data?.costumes ?? 0,
      dniClient: data?.dniClient ?? "",
      note: data?.note ?? "",
      dischargeDate: data?.dischargeDate ?? "",
      returnedDate: data?.returnedDate ?? "",
      retirementDate: data?.retirementDate ?? "",
    },
    // validate: (values) => {
    //   try {
    //     billSchema.parse(values);
    //   } catch (error) {
    //     if (error instanceof ZodError) return error.formErrors.fieldErrors;
    //   }
    // },
    onSubmit: (values) => {
      const precioTotal = demoPrecioTotalAccesorios + demoPrecioTotalDisfraz;
      values.dniClient = Number(values.dniClient.toString().split(" ")[0]);
      values.costumes = countCostumesList;
      values.others = accessories;
      values.depositoSaldo =
        precioTotal - values.depositoACuenta - values.depositoDescuento;
      values.precioSaldo =
        precioTotal - values.precioACuenta - values.precioDescuento;
      values.precioTotal = precioTotal - values.precioDescuento;
      values.depositoTotal = precioTotal;
      // values.depositoSaldo =
      //   values.depositoTotal - values.depositoACuenta;

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

  const [demoPrecioTotalDisfraz, setDemoPrecioTotalDisfraz] = useState(0);
  const [demoPrecioTotalAccesorios, setDemoPrecioTotaAccesorios] = useState(0);

  const [accessories, setAccessories] = useState<Others[]>([]);

  const [countCostumesList, setCountCostumesList] = useState<CountCostume[]>(
    []
  );

  const handleChangeAccessorie = (accessorios: Others[]) => {
    const accessoriesTotal = accessorios.reduce((total, item) => {
      return total + item.price * item.cant;
    }, 0);

    setAccessories(accessorios);
    setDemoPrecioTotaAccesorios(accessoriesTotal);
  };

  const handleChangeCostume = (costumes: CountCostume[]) => {
    const costumesTotal = costumes.reduce((total, costume) => {
      const foundCostume = costumesList.find(
        (u) =>
          u.name ===
          costume.costumeName.substring(0, costume.costumeName.indexOf(" -"))
      );
      if (foundCostume) {
        return total + foundCostume.category.price * costume.cant;
      }
      return total;
    }, 0);

    setCountCostumesList(costumes);
    setDemoPrecioTotalDisfraz(costumesTotal);
  };

  return (
    <>
      <form className='flex flex-col gap-5 w-full px-2' onSubmit={handleSubmit}>
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

        <div className='w-full h-1 bg-primary rounded-lg'></div>
        <div className='grid grid-cols-3 bg-slate-200 p-4 rounded-lg '>
          <div className='flex gap-2 flex-col  col-span-3'>
            {/* <h1>Precio</h1> */}
            <div className='flex gap-2'>
              <Input
                title='Precio total'
                value={
                  demoPrecioTotalAccesorios +
                  demoPrecioTotalDisfraz -
                  values.precioDescuento
                }
                readOnly
                placeholder='Precio total'
                name='precioTotal'
                type='number'
                onChange={handleChange}
                onBlur={handleBlur}
                validate={
                  touched.precioTotal && errors.precioTotal ? true : false
                }
              />
              <Input
                title='A cuenta'
                value={values.precioACuenta}
                placeholder='A cuenta'
                name='precioACuenta'
                type='number'
                onChange={handleChange}
                onBlur={handleBlur}
                validate={
                  touched.precioACuenta && errors.precioACuenta ? true : false
                }
              />
              <Input
                title='Saldo precio'
                value={
                  demoPrecioTotalAccesorios +
                  demoPrecioTotalDisfraz -
                  values.precioACuenta -
                  values.precioDescuento
                }
                placeholder='Saldo'
                readOnly
                name='precioSaldo'
                type='number'
                onChange={handleChange}
                onBlur={handleBlur}
                validate={
                  touched.precioSaldo && errors.precioSaldo ? true : false
                }
              />
            </div>
            <Input
              placeholder='Ingrese descuento'
              validate={
                touched.precioDescuento && errors.precioDescuento ? true : false
              }
              title='Descuento en precio'
              type='number'
              name='precioDescuento'
              value={values.precioDescuento}
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
                readOnly
                value={
                  demoPrecioTotalAccesorios +
                  demoPrecioTotalDisfraz -
                  values.depositoDescuento
                }
                placeholder='Depósito total'
                name='depositoTotal'
                type='number'
                onChange={handleChange}
                onBlur={handleBlur}
                validate={
                  touched.depositoTotal && errors.depositoTotal ? true : false
                }
              />
              <Input
                title='A cuenta'
                value={values.depositoACuenta}
                placeholder='A cuenta'
                name='depositoACuenta'
                type='number'
                onChange={handleChange}
                onBlur={handleBlur}
                validate={
                  touched.depositoACuenta && errors.depositoACuenta
                    ? true
                    : false
                }
              />
              <Input
                title='Saldo deposito'
                value={
                  demoPrecioTotalAccesorios +
                  demoPrecioTotalDisfraz -
                  values.depositoACuenta -
                  values.depositoDescuento
                }
                placeholder='Saldo'
                readOnly
                name='depositoSaldo'
                type='number'
                onChange={handleChange}
                onBlur={handleBlur}
                validate={
                  touched.depositoSaldo && errors.depositoSaldo ? true : false
                }
              />
            </div>
            <Input
              placeholder='Ingrese descuento'
              validate={
                touched.depositoDescuento && errors.depositoDescuento
                  ? true
                  : false
              }
              title='Descuento en depósito'
              type='number'
              name='depositoDescuento'
              // readOnly
              value={values.depositoDescuento}
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
