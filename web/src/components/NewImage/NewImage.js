import { useMutation } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import { useState, useEffect } from 'react';
import NewImageForm from 'src/components/ImageForm/NewImageForm'
import { getLoggedInUser, dummyObject } from 'src/functions/WebFunctions'
import { toast } from '@redwoodjs/web/toast'

const USER_QUERY = gql`
  query NewImageQuery($currentUserId: Int!) {
    userByQuery : user (id: $currentUserId) {
      localStoragePassword
    }
  }
`

const CREATE_IMAGE_MUTATION = gql`
  mutation CreateImageMutation($input: CreateImageInput!) {
    createImage(input: $input) {
      id
    }
  }
`

const NewImage = () => {

  const [user, setUser] = useState({ });

  const currentUserId = getLoggedInUser().id;

  useEffect(() => {
    const localStorageUser = getLoggedInUser();
    setUser(localStorageUser);
  }, [])

  const { error:useQueryError, data } = currentUserId ?
    useQuery(USER_QUERY, {
      variables: { currentUserId }
    })
    :
    dummyObject;

  const [createImage, { loading, error }] = useMutation(CREATE_IMAGE_MUTATION, {
    onCompleted: () => {
      navigate(routes.images())
      toast.success('Memo created.', { classes: 'rw-flash-success' })
    },
  })

  const onSave = (input) => {
    createImage({ variables: { input: { ...input, userId:currentUserId } } })
  }

  return (
    <div className="rw-segment margin-new-or-edit-image-component">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Memo</h2>
      </header>
      <div className="rw-segment-main">
      {(data && user.localStoragePassword === data.userByQuery.localStoragePassword)
      ? <NewImageForm
          onSave={onSave}
          loading={loading}
          error={error}
          userId={currentUserId}
        />
      : <h3 className='branding-font'>Womp womp...invalid credentials</h3>}
      </div>
    </div>
  )
}

export default NewImage
