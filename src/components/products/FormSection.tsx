// Component
import { Input, Select } from "@/components"
import { useCategory } from "@/viewModel/product"

// Form
import { Field, FieldProps, Form, useFormikContext } from "formik"

export function FormSection() {
  // Hooks
  const { category, loading } = useCategory()
  const { isSubmitting } = useFormikContext()

  // Variables
  const data = category.map(val => {
    return {
      label: val,
      value: val
    }
  })

  return (
    <Form>
      <div className="grid md:grid-cols-2 gap-x-2">
        <Field name="title">
          {({ field, meta }: FieldProps) => (
            <Input
              label="Title"
              error={meta.touched && meta.error && meta.error}
              {...field}
            />
          )}
        </Field>

        <Field name="brand">
          {({ field, meta }: FieldProps) => (
            <Input
              label="Brand"
              error={meta.touched && meta.error && meta.error}
              {...field}
            />
          )}
        </Field>
      </div>

      <div className="grid md:grid-cols-2 gap-x-2">
        <Field name="category">
          {({ field, meta }: FieldProps) => (
            <Select
              data={data}
              error={meta.touched && meta.error && meta.error}
              label="Category"
              loading={loading}
              {...field}
            />
          )}
        </Field>

        <Field name="price">
          {({ field, meta }: FieldProps) => (
            <Input
              type="number"
              label="Price"
              leftGroup="$"
              error={meta.touched && meta.error && meta.error}
              {...field}
            />
          )}
        </Field>
      </div>

      <Field name="description">
        {({ field, meta }: FieldProps) => (
          <Input
            type="textarea"
            label="Description"
            error={meta.touched && meta.error && meta.error}
            {...field}
          />
        )}
      </Field>

      <button type="submit" className={`btn btn-primary mt-3 ${isSubmitting && "loading"}`}>
        Submit
      </button>
    </Form>
  )
}