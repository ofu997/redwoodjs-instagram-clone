import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'

import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'

import './custom-styles.css'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => (
  <FatalErrorBoundary page={FatalErrorPage}>
    <RedwoodProvider>
      <RedwoodApolloProvider>
        <Routes />
      </RedwoodApolloProvider>
    </RedwoodProvider>
  </FatalErrorBoundary>
)

export default App
