import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
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
    const dataWithUrlUserId = Object.assign(data, { url }, { userId })
    props.onSave(dataWithUrlUserId)
  }

  console.log(imageAsFile)
  const handleImageAsFile = (e) => {
    setImageAsFile(e.target.files[0])
    setShowUpload(true)
  }

  const handleFirebaseUpload = (e, data) => {
    if (!imageAsFile) {
      return
    }
    e.preventDefault()
    console.log('start of upload')
    // async magic goes here...
    if (imageAsFile === '') {
      console.error(`not an image, the image file is a ${typeof (imageAsFile)}`)
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

        <Label
          name="select"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
          style={{
            marginTop: '100px'
          }}
        >
          Select
        </Label>
        {showInput && !url &&
          <input
            type='file'
            onChange={handleImageAsFile}
          />
        }

        {showUpload &&
          <div style={{ marginTop: '50px', maxWidth: '25%' }}>
            <div className="rw-button rw-button-green rw-button-small" onClick={handleFirebaseUpload}
              style={{ padding: '15px 30px' }}
            >
              <p>Upload</p>
            </div>
          </div>
        }

        {url && (
          <div style={{ maxWidth: '25%' }}>
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

        <div style={{ display: 'none' }}>
          <div id='formLikes' >
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
        </div>

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
