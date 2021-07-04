import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'
import Header from 'src/components/Header/Header'

const ImagesLayout = (props) => {
  return (
    <div className="rw-scaffold">
      <Toaster timeout={1000} />
      <Header />
      <main className="rw-main">{props.children}</main>
    </div>
  )
}

export default ImagesLayout
