import { Category } from "@/app/lib/definitions";
import { validateCategory } from "@/app/lib/schemas/categorySchema";
import { Input } from "@/components";
import { useCategory } from "@/hook/useCategory";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { ZodError } from "zod";

interface Props {
  data?: Category;
}

export default function Form({ data }: Props) {
  const { createCategory, updateCategory } = useCategory();

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
      id: data?.id ?? "",
      name: data?.name ?? "",
      price: data?.price ?? 0,
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
        Swal.showLoading();
        createCategory(values);
      } else {
        Swal.showLoading();
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
          errors={errors.name || ""}
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
          errors={errors.price || ""}
          placeholder='Ingrese precio'
          validate={touched.price && errors.price ? true : false}
          title='Precio'
          type='number'
          name='price'
          value={values.price}
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
