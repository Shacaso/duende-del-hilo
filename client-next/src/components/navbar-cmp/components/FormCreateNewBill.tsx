import Form from "@/app/(general)/client/components/Form";
import FormNewCostume from "@/app/(general)/costume/components/FormNewCostume";
import { BillDto, CountCostume, Others } from "@/app/lib/definitions";
import Input from "@/components/Input";
import ConfirmationModal from "@/components/modal-cmp/ConfirmationModal";
import { useBill } from "@/hook/useBill";
import { useClient } from "@/hook/useClient";
import { useCostume } from "@/hook/useCostume";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AccessoriesInputList } from "./AccessoriesInputList";
import { CostumeInputList } from "./CostumeInputList";
import { z } from "zod";

interface Props {
  data?: BillDto;
}

export default function FormCreateNewBill({ data }: Props) {
  const { getAllClients, clients } = useClient();
  const { getAllCostumes, costumes: costumesList } = useCostume();
  const { createBill, updateBill } = useBill();

  // const [costumeSelected, setCostumeSelected] = useState<CountCostume[]>([]);

  const [confirmationModalOpen, setConfirmationModalOpen] =
    useState<boolean>(false);
  const [confirmationClientModalOpen, setConfirmationClientModalOpen] =
    useState<boolean>(false);
  const billSchema = z.object({
    id: z.string().optional(),

    billNumber: z.number().optional(),

    date: z.string().optional(),

    returnedDate: z.string(),

    retirementDate: z.string(),

    returned: z.coerce
      .boolean({
        invalid_type_error:
          "El valor del atributo devuelto debe ser un booleano",
      })
      .default(false),

    precioTotal: z
      .number({
        invalid_type_error: "El precio total debe ser un numero mayor que 0",
        required_error: "El precio total es requerido",
      })
      .nonnegative({
        message: "El adelanto debe ser positivo",
      }),

    precioACuenta: z
      .number({
        invalid_type_error: "El precio a cuenta debe ser un numero mayor que 0",
        required_error: "El precio a cuenta es requerido",
      })
      .nonnegative({
        message: "El precio a cuenta debe ser positivo",
      })
      .optional(),

    precioDescuento: z
      .number({
        invalid_type_error:
          "El descuento al precio debe ser un numero mayor que 0",
        required_error: "El descuento al precio es requerido",
      })
      .nonnegative({
        message: "El descuento al precio debe ser positivo",
      })
      .optional(),

    precioSaldo: z.number().optional(),

    depositoTotal: z
      .number({
        invalid_type_error: "El deposito total debe ser un numero mayor que 0",
        required_error: "El deposito total  es requerido",
      })
      .nonnegative({
        message: "El deposito total debe ser positivo",
      }),

    depositoACuenta: z
      .number({
        invalid_type_error:
          "El deposito a cuenta debe ser un numero mayor que 0",
        required_error: "El deposito a cuenta es requerido",
      })
      .nonnegative({
        message: "El deposito a cuenta debe ser positivo",
      })
      .optional(),

    depositoDescuento: z
      .number({
        invalid_type_error:
          "El descuento del deposito debe ser un numero mayor que 0",
        required_error: "El descuento del deposito es requerido",
      })
      .nonnegative({
        message: "El descuento del deposito debe ser positivo",
      })
      .optional(),

    depositoSaldo: z.number().optional(),

    dniClient: z
      .number({
        invalid_type_error: "El dni debe ser un numero mayor que 0",
        required_error: "El dni es requerido",
      })
      .refine((value) => clients.map((c) => c.dni).includes(value), {
        message: "No se encuenta ese id de Usuario en la base de datos",
      }),

    note: z.string({
      invalid_type_error: "La nota debe ser un string",
      required_error: "La nota es requerido",
    }),

    costumes: z
      .array(
        z.object({
          costumeName: z.string(),
          cant: z.number().positive(),
        })
      )
      .nonempty({
        message: "La factura debe contener al menos un disfraz comprado",
      }),
    others: z
      .array(
        z.object({
          name: z.string(),
          price: z
            .number({
              invalid_type_error: "El precio debe ser un numero mayor que 0",
              required_error: "El precio es requerido",
            })
            .positive(),
        })
      )
      .nullable()
      .optional(),

    dischargeDate: z.string().default(""),
  });

  const {
    handleSubmit,
    values,
    handleChange,
    errors,
    touched,
    handleBlur,
    resetForm,
  } = useFormik({
    initialValues: {
      billNumber: data?.billNumber ?? 0,
      costumes: data?.costumes ?? [],
      date: data?.date ?? "",
      depositoACuenta: data?.depositoACuenta ?? 0,
      depositoDescuento: data?.depositoDescuento ?? 0,
      depositoSaldo: data?.depositoSaldo ?? 0,
      depositoTotal: data?.depositoTotal ?? 0,
      dischargeDate: data?.dischargeDate ?? "",
      dniClient: data?.dniClient ?? 0,
      id: data?.id ?? "",
      note: data?.note ?? "",
      others: data?.others ?? null,
      precioACuenta: data?.precioACuenta ?? 0,
      precioDescuento: data?.precioDescuento ?? 0,
      precioSaldo: data?.precioSaldo ?? 0,
      precioTotal: data?.precioTotal ?? 0,
      retirementDate: data?.retirementDate ?? "",
      returned: data?.returned ?? false,
      returnedDate: data?.returnedDate ?? "",
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
      values.precioTotal = precioTotal;
      values.depositoTotal = precioTotal;
      // values.depositoSaldo =
      //   values.depositoTotal - values.depositoACuenta;

      // console.log("Submit form: ", values);

      if (!data) {
        createBill(values);
      } else {
        updateBill(values);
      }
      resetForm();

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

    const costumeList = costumes.map((c) => ({
      cant: c.cant,
      costumeName: c.costumeName.substring(0, c.costumeName.indexOf(" -")),
    }));

    setCountCostumesList(costumeList);
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
          errors={errors.note || ""}
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
                errors={errors.precioTotal || ""}
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
                errors={errors.precioACuenta || ""}
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
                errors={errors.precioSaldo || ""}
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
              errors={errors.precioDescuento || ""}
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
                errors={errors.depositoTotal || ""}
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
                errors={errors.depositoACuenta || ""}
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
                errors={errors.depositoSaldo || ""}
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
              errors={errors.depositoDescuento || ""}
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
              errors={errors.retirementDate || ""}
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
              errors={errors.returnedDate || ""}
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
