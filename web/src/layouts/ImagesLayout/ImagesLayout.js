import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

const ImagesLayout = (props) => {
  return (
    <div className="rw-scaffold">
      <Toaster timeout={1000} />
      <header className="rw-header" style={{ backgroundColor: '#F5F5F5' }}>
        {/* <h1 className="rw-heading rw-heading-primary">
          <Link to={routes.images()} className="rw-link">
            Images
          </Link>
        </h1> */}
        <Link to={routes.newImage()} className="rw-button rw-button-green">
          <div className="rw-button-icon">+</div> New Image
        </Link>
      </header>
      <main className="rw-main">{props.children}</main>
    </div>
  )
}

export default ImagesLayout
