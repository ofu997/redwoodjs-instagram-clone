import {
  Form,
  FormError,
  Label,
  TextField,
  FieldError,
  TextAreaField,
  Submit,
} from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
import { QUERY } from 'src/components/ImagesCell'
import { useState } from 'react'
import { getLoggedInUser } from 'src/functions/GetLoggedInUser'
import { toast } from '@redwoodjs/web/toast'

const currentUser = getLoggedInUser();

const CREATE_COMMENT_MUTATION = gql`
  mutation CreateCommentMutation($input: CreateCommentInput!) {
    createComment(input: $input) {
      id
      body
    }
  }
`

const CommentForm = ({ imageId, userId }) => {
  const [createComment, { loading, error }] = useMutation(CREATE_COMMENT_MUTATION, {
    onCompleted: () =>
    {},
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onSubmit = () => {
    setContent('');
    currentUser.id ? (
      createComment({ variables: { input: { imageId, posterId: userId, body: content } } })
    )
    : toast.error('Must be logged in to comment')
  }

  const [content, setContent] = useState('')

  const handleChange = e => {
    setContent(e.target.value)
  }

  return (
    <div>
      <Form className="w-full" onSubmit={onSubmit}>
        <FormError
          error={error}
          titleClassName="font-semibold"
          wrapperClassName="bg-red-100 text-red-900 text-sm p-3 rounded"
        />
        <div id='commentform-input-and-button'>
          <TextField
            name='content'
            value={content}
            onChange={handleChange}
            // className='rw-input'
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
            id="comment-input"
            // style={{ border: '1px solid black' }}
          />
          <FieldError name="content" className="rw-field-error" />


          <Submit
            disabled={loading}
          >
            <p style={{ color: 'black', padding: 5, fontSize: '0.9rem', backgroundColor: '#e3fbe3', border: '1px solid gray', borderRadius: '5%', margin: '5px' }}>
              Comment
            </p>
          </Submit>
        </div>


      </Form>
    </div>
  )
}

export default CommentForm
