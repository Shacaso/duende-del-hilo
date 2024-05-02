import { Category } from "@/app/lib/definitions";
import { useCategory } from "@/hook/useCategory";
import { useFormik } from "formik";
import { ZodError } from "zod";
import { validateCategory } from "@/app/lib/schemas/categorySchema";
import { Input } from "@/components";

interface Props {
  data?: Category;
}

export default function Form({ data }: Props) {
  const { createCategory, updateCategory } = useCategory();

  const {
    initialValues,
    handleSubmit,
    values,
    handleChange,
    errors,
    touched,
    handleBlur,
    resetForm,
  } = useFormik({
    initialValues: {
      id: data?.id ?? "",
      name: data?.name ?? "",
    },
    validate: (values) => {
      try {
        validateCategory(values);
      } catch (error) {
        if (error instanceof ZodError) return error.formErrors.fieldErrors;
      }
    },
    onSubmit: (values) => {
      if (!data) {
        createCategory(values);
      } else {
        updateCategory(values);
      }
      resetForm();
    },
  });

  return (
    <form
      className='flex flex-col justify-between gap-5 w-full h-full p-5'
      onSubmit={handleSubmit}
    >
      <div className='flex flex-col gap-5'>
        <Input
          placeholder='Ingrese nombre de categoria'
          validate={touched.name && errors.name ? true : false}
          title='Categoria'
          type='text'
          name='name'
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <Input
          placeholder='Ingrese precio'
          validate={touched.name && errors.name ? true : false}
          title='Precio'
          type='number'
          name='name'
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>

      <button className='btn btn-primary' type='submit'>
        GUARDAR
      </button>
    </form>
  );
}
