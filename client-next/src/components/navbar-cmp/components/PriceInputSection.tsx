import Input from "@/components/Input";

interface Props {
  values?: string | number;
  handleChange?: {
    (e: React.ChangeEvent<any>): void;
    <T_1 = string | React.ChangeEvent<any>>(
      field: T_1
    ): T_1 extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
  handleBlur?: {
    (e: React.FocusEvent<any, Element>): void;
    <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
  };
  touched?: boolean;
  errors?: boolean;
}

export const PriceInputSection = ({
  values,
  handleChange,
  handleBlur,
  touched,
  errors,
}: Props) => {
  return (
    <div className='grid grid-cols-3 bg-slate-200 p-4 rounded-lg border-red-600 border-2'>
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
            validate={touched.amountTotal && errors.amountTotal ? true : false}
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
            title='Saldo'
            value={values.demoPrecioSaldo}
            placeholder='Saldo'
            readOnly
            name='demoPrecioSaldo'
            type='number'
            onChange={handleChange}
            onBlur={handleBlur}
            validate={
              touched.demoPrecioSaldo && errors.demoPrecioSaldo ? true : false
            }
          />
        </div>
      </div>
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
            title='Saldo'
            value={values.demoDepositoSaldo}
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
      </div>
      <div className='flex gap-2  col-span-3 '>
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
  );
};
