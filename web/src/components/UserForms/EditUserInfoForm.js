import { useState } from 'react'
import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'
import { storage } from 'src/firebase/firebase'

const EditUserInfoForm = props => {
  const [profilePicAsFile, setProfilePicAsFile] = useState('')
  const [profilePicUrl, setProfilePicUrl] = useState(props.user.profilePicUrl)
  const [showInput, setShowInput] = useState(true)
  const [showUpload, setShowUpload] = useState(false)

  const onSubmit = (data) => {
    const dataWithProfilePicUrl = Object.assign(data, { profilePicUrl } )
    props.onSave(dataWithProfilePicUrl, props.user.id)
  }

  const handleProfilePicAsFile = (e) => {
    setProfilePicAsFile(e.target.files[0])
    setShowUpload(true)
  }

  const handleFirebaseUpload = (e) => {
    if (!profilePicAsFile) {
      return;
    }
    e.preventDefault()
    if (profilePicAsFile === '') {
      console.error(`not an image, the image file is a ${typeof (profilePicAsFile)}`)
    }
    const uploadTask = storage.ref(`/profile-pics/${profilePicAsFile.name}`).put(profilePicAsFile)
    uploadTask.on('state_changed',
      (snapShot) => {
        console.log(`snapshot: ${snapShot}`)
      }, (err) => {
        console.log(err)
      }, () => {
        storage
          .ref('profile-pics')
          .child(profilePicAsFile.name)
          .getDownloadURL()
          .then(fireBaseUrl => {
            setProfilePicUrl(fireBaseUrl)
          })
          .then(() =>{
            const rawLSuserToUpdate = localStorage.getItem('user')
            const LSuserToUpdate = JSON.parse(rawLSuserToUpdate)
            LSuserToUpdate.profilePicUrl = profilePicUrl
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
          name="name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Name
        </Label>
        <TextField
          name="name"
          defaultValue={props.user.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />
        <FieldError name="name" className="rw-field-error" />

        <Label
          name="bio"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Bio
        </Label>
        <TextField
          name="bio"
          defaultValue={props.user.bio}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />
        <FieldError name="bio" className="rw-field-error" />

        <Label
          name="profile-picture"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
          style={{
            marginTop: '100px'
          }}
        >
          Profile picture
        </Label>
        {showInput && !profilePicUrl &&
          <input
            type='file'
            onChange={handleProfilePicAsFile}
          />
        }
        {showUpload &&
          <div style={{ marginTop: '50px', maxWidth: '25%' }}>
            <div className="rw-button-group rw-button rw-button-green" onClick={handleFirebaseUpload}
            >
              Upload
            </div>
          </div>
        }

        {profilePicUrl && (
          <div style={{ maxWidth: '25%' }}>
            <img src={profilePicUrl} style={{ display: 'block', margin: '2rem 0', objectFit: 'contain' }} height='300' />
            <div
              onClick={() => {
                setProfilePicUrl(null)
                setShowInput(true)
                }
              }
              className="bg-blue-100 rw-button-small hover:bg-red-100 text-xs rounded px-4 py-2 uppercase font-semibold tracking-wide"
              style={{ textAlign: 'center' }}
            >
              Replace Image
            </div>
          </div>
        )}

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>

      </Form>
    </div>
  )
}

export default EditUserInfoForm
