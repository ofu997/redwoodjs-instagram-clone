import { Link, routes } from '@redwoodjs/router'

import Images from 'src/components/Images'

export const QUERY = gql`
  query IMAGES {
    images {
      id
      title
      url
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No images yet. '}
      <Link to={routes.newImage()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Success = ({ images }) => {
  return <Images images={images} />
}
