import ReactDOM from 'react-dom'
import { FatalErrorBoundary } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'
import FatalErrorPage from 'src/pages/FatalErrorPage'

import Routes from 'src/Routes'

import './custom-styles.css'
import './index.css'

import { Provider } from 'react-redux'
import store from 'src/redux/store'

ReactDOM.render(
  <Provider store={store}>
    <FatalErrorBoundary page={FatalErrorPage}>
      <RedwoodApolloProvider>
        <Routes />
      </RedwoodApolloProvider>
    </FatalErrorBoundary>
  </Provider>,
  document.getElementById('redwood-app')
)
