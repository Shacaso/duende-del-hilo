import { Category } from "@/app/lib/definitions";
import { fetchPatch, fetchPost } from "@/app/lib/fetching";
import { useFormik } from "formik";
import { z, ZodError } from "zod";

interface Props {
  data?: Category;
}

export default function Form({ data }: Props) {
  const clientSchema = z.object({
    id: z.string().optional(),
    name: z.string({
      invalid_type_error: "El nombre debe ser un string",
      required_error: "El nombre es requerido",
    }),
  });

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
      name: data?.name ?? "",
    },
    validate: (values) => {
      try {
        clientSchema.parse(values);
      } catch (error) {
        if (error instanceof ZodError) return error.formErrors.fieldErrors;
      }
    },
    onSubmit: (values) => {
      // console.log(values);

      if (!data) {
        fetchPost(values, "categories").then((res) => {
          if (res) {
            alert("La categoria se ha guardado");
          }
        });
      } else {
        fetchPatch(data.id, values, "categories").then((res) => {
          if (res) {
            alert("La categoria se ha actualizado");
          }
        });
      }
    },
  });

  return (
    <form
      className='flex flex-col gap-5 w-full h-full p-5'
      onSubmit={handleSubmit}
    >
      {touched.name && errors.name && <p>{errors.name}</p>}
      <input
        className='w-full input input-bordered h-full'
        placeholder='name'
        type='text'
        name='name'
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
      />

      <button className='btn btn-primary' type='submit'>
        SAVE!
      </button>
    </form>
  );
}
