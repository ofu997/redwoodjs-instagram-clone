import {
  Form,
  FormError,
  FieldError,
  Label,
  TextAreaField,
  Submit,
} from '@redwoodjs/forms'
import { useState } from 'react'
import { storage } from 'src/firebase/firebase'

const NewImageForm = (props) => {
  const [imageAsFile, setImageAsFile] = useState('')
  const [url, setUrl] = useState('')
  const [showInput, setShowInput] = useState(true)
  const [showUpload, setShowUpload] = useState(false)
  const userId = props.userId;

  const onSubmit = data => {
    const dataWithCaption = { ...data, title:data.caption }
    delete dataWithCaption.caption;
    const dataWithUrlUserId = Object.assign(dataWithCaption, { url }, { userId })
    props.onSave(dataWithUrlUserId)
  }

  const handleImageAsFile = (e) => {
    setImageAsFile(e.target.files[0])
    setShowUpload(true)
  }

  const handleFirebaseUpload = (e, data) => {
    if (!imageAsFile) {
      return
    }
    e.preventDefault()
    // async magic goes here...
    if (imageAsFile === '') {
      console.error(`not an image, the image file is a ${typeof (imageAsFile)}`)
    }
    const uploadTask = storage.ref(`/images/${imageAsFile.name}`).put(imageAsFile)
    //initiates the firebase side uploading
    uploadTask.on('state_changed',
      (snapShot) => {
        //takes a snap shot of the process as it is happening
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
            setUrl(fireBaseUrl)
          })
          .then(()=>{
            setShowUpload(false)
            setShowInput(false)
          })
      }
    )
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
          className="rw-label"
          errorClassName="rw-label rw-label-error"
          style={{ marginTop: '5vh' }}
        >
        </Label>
        {showInput && !url &&
            <input
              type='file'
              onChange={handleImageAsFile}
              className='image-input'
            />
        }

        {showUpload &&
          <div style={{ marginTop: '50px', maxWidth: '25%' }}>
            <div className="rw-button-group rw-button rw-button-green" onClick={handleFirebaseUpload}>
              Upload
            </div>
          </div>
        }

        {url && (
          <div className='cntr-h' id='new-image-container'>
            <img src={url} style={{ display: 'block', margin: '2rem 0' }} />
            <div
              onClick={() => {
                setUrl(null)
                setShowInput(true)
                }
              }
              className="bg-blue-100 hover:bg-red-100 text-xs rounded px-4 py-2 uppercase font-semibold tracking-wide"
              style={{ textAlign: 'center' }}
            >
              Replace Image
            </div>
          </div>
        )}

        {url && (
          <>
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
            />
            <FieldError name="caption" className="rw-field-error" />
          </>
        )}

        {url &&
          <div className="rw-button-group">
            <Submit disabled={props.loading} className="rw-button rw-button-blue">
              Save
            </Submit>
          </div>
        }
      </Form>
    </div>
  )
}

export default NewImageForm

// uploads to firebase
// saves url and redirects to /images page
