import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { createClient, Provider, defaultExchanges } from 'urql'
import { devtoolsExchange } from '@urql/devtools'

const client = createClient({
  url: 'http://localhost:3000/graphql',
  exchanges: [devtoolsExchange, ...defaultExchanges]
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider value={client}>
      <App />
    </Provider>
  </React.StrictMode>
)
