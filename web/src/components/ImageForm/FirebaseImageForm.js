import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  NumberField,
  Submit,
} from '@redwoodjs/forms'
import { useState } from 'react'
import {storage} from '../../firebase/firebase'

const FirebaseImageForm = (props) => {
  const [imageAsFile, setImageAsFile] = useState('')
  const [url, setUrl] = useState(props?.image?.url)

  const onSubmit = (data) => {
    const dataWithUrl = Object.assign(data, { url })
    console.table(` ${dataWithUrl}`)
    props.onSave(dataWithUrl, props?.image?.id)
  }

  console.log(imageAsFile)
  const handleImageAsFile = (e) => {
    setImageAsFile(e.target.files[0])
  }

  const handleFirebaseUpload = (e, data) => {
    e.preventDefault()
    console.log('start of upload')
    // async magic goes here...
    if(imageAsFile === '' ) {
      console.error(`not an image, the image file is a ${typeof(imageAsFile)}`)
    }
    const uploadTask = storage.ref(`/images/${imageAsFile.name}`).put(imageAsFile)
    //initiates the firebase side uploading
    uploadTask.on('state_changed',
    (snapShot) => {
      //takes a snap shot of the process as it is happening
      console.log(`snapshot: ${snapShot}`)
    }, (err) => {
      //catches the errors
      console.log(err)
    }, () => {
      // gets the functions from storage refences the image storage in firebase by the children
      // gets the download url then sets the image from firebase as the value for the imgUrl key:
      storage
        .ref('images')
        .child(imageAsFile.name)
        .getDownloadURL()
        .then(fireBaseUrl => {
          console.log(`firebaseurl: ${fireBaseUrl}`)
          setUrl(fireBaseUrl)
        })
      })

      // save to table
      // dataWithUrl = Object.assign(data, { url }),
      // props.onSave(Object.assign(data, { url }), props?.image?.id)
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
          name="title"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Title
        </Label>
        <TextField
          name="title"
          defaultValue={props.image?.title}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="title" className="rw-field-error" />

        <input
          type='file'
          onChange={handleImageAsFile}
        />
        <button onClick={handleFirebaseUpload}>Upload</button>

        {url && (
          <div>
            <img src={url} style={{ display: 'block', margin: '2rem 0' }} />
            <a
              href="#"
              onClick={() =>
              setUrl(null)}
              className="bg-blue-600 text-white hover:bg-blue-700 text-xs rounded px-4 py-2 uppercase font-semibold tracking-wide"
            >
              Replace Image
            </a>
          </div>
        )}

        <div id='formLikes' style={{ display: 'none' }}>
          <Label
            name="url"
            className="rw-label"
            errorClassName="rw-label rw-label-error"
          >
            Url
          </Label>
          <TextField
            name="url"
            defaultValue={props.image?.url}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: false }}
          />
          <FieldError name="url" className="rw-field-error" />
        </div>

        <div id='formLikes' style={{ display: 'none' }}>
          <Label
            name="likes"
            className="rw-label"
            errorClassName="rw-label rw-label-error"
          >
            Likes
          </Label>
          <NumberField
            name="likes"
            defaultValue={0}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: false }}
          />
          <FieldError name="likes" className="rw-field-error" />
          <NumberField
            name="userId"
            defaultValue={2}
          />
        </div> {/* hidden */}

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default FirebaseImageForm

// uploads to firebase
// saves url and redirects to /images page
// does not show thumbnail