import {
  Form,
  FormError,
  FieldError,
  Label,
  TextAreaField,
  Submit,
} from '@redwoodjs/forms'

const ImageForm = (props) => {
  const onSubmit = (data) => {
    const dataToSave = { title : data.caption }
    props.onSave(dataToSave, props?.image?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="caption"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Caption
        </Label>
        <TextAreaField
          name="caption"
          defaultValue={props.image?.title}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="caption" className="rw-field-error" />
        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default ImageForm
