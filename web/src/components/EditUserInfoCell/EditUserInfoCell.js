import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import toast from 'react-hot-toast'
import EditUserInfoForm from 'src/components/UserForms/EditUserInfoForm'
import { getLoggedInUser } from 'src/functions/WebFunctions'

export const QUERY = gql`
  query findUserByHandle($handle: String!) {
    userToEdit: findUserByHandle(handle: $handle) {
      id
      name
      handle
      bio
      profilePicUrl

      localStoragePassword
    }
  }
`

const EDIT_USER_INFO_MUTATION = gql`
  mutation EditUserInfoMutation($id: Int!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
    }
  }
`

export const Loading = () => <h2 className='branding-font'>Loading...</h2>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ userToEdit }) => {
  const LSuser = getLoggedInUser();
  const [editUserInfo, {loading, error}] = useMutation(EDIT_USER_INFO_MUTATION, {
    onCompleted: () => {
      navigate( routes.userPage({handle: userToEdit.handle}) )
      toast.success('Info updated', { classes: 'rw-flash-success' })
    }
  })

  const onSave = (input, id) => {
    editUserInfo({ variables: { id, input }})
  }

  return(
    <>
    {LSuser.localStoragePassword === userToEdit.localStoragePassword ? (
      <div className="rw-segment">
        <div className="rw-segment-main">
          <EditUserInfoForm
            user={userToEdit}
            onSave={onSave}
            error={error}
            loading={loading}
          />
        </div>
      </div>
    )
    : (
      <h3 className='branding-font'>Womp womp...invalid credentials</h3>
    )}
    </>
  )
}
