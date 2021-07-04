import ImageForm from 'src/components/ImageForm'

const EditImage = props => {
  return (
    <div className='rw-segment margin-new-or-edit-image-component'>
      <div className="rw-segment-main">
        <img src={props.image.url} width='300' id='image-for-edit-image-cell' />
        <ImageForm
          image={props.image}
          onSave={props.onSave}
          error={props.error}
          loading={props.loading}
        />
      </div>
    </div>
  )
}

export default EditImage
