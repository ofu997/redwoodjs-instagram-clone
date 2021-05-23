import ReactDOM from 'react-dom'
import { FatalErrorBoundary } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'
import FatalErrorPage from 'src/pages/FatalErrorPage'

import Routes from 'src/Routes'

import './custom-styles.css'
import './index.css'

ReactDOM.render(
  <FatalErrorBoundary page={FatalErrorPage}>
    <RedwoodApolloProvider>
      <Routes />
    </RedwoodApolloProvider>
  </FatalErrorBoundary>,
  document.getElementById('redwood-app')
)
