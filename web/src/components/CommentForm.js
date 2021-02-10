import {
  Form,
  FormError,
  Label,
  TextField,
  TextAreaField,
  Submit,
} from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'

// const CREATE_COMMENT_MUTATION = gql`
//   mutation CreateCommentMutation($input: CreateCommentInput!) {
//     createComment(input: $input) {
//       id
//       body
//       image
//       imageId
//     }
//   }
// `

const CREATE_COMMENT_MUTATION = gql`
  mutation CreateCommentMutation($input: CreateCommentInput!) {
    createComment(input: $input) {
      id
      body
    }
  }
`

const CommentForm = ({ imageId }) => {
  const [createComment, { loading, error }] = useMutation(CREATE_COMMENT_MUTATION)

  const onSubmit = (input) => {
    createComment({ variables: { input: { imageId, ...input } } })
  }

  return (
    <div>
      <Form className="mt-4 w-full" onSubmit={onSubmit}>
        <FormError
          error={error}
          titleClassName="font-semibold"
          wrapperClassName="bg-red-100 text-red-900 text-sm p-3 rounded"
        />

        <TextField
          name="body"
          validation={{ required: true }}
          placeholder="Comment"
        />
        <Submit
          disabled={loading}
        >
          <p style={{ backgroundColor: 'gray', color: 'white', padding: 5, fontSize: '0.9rem' }}>
            Comment
          </p>
        </Submit>


      </Form>
    </div>
  )
}

export default CommentForm