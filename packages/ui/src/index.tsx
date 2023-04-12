import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { createClient, Provider, cacheExchange, fetchExchange, ssrExchange } from 'urql'
import { devtoolsExchange } from '@urql/devtools'

const isServerSide = typeof window === 'undefined'

// The `ssrExchange` must be initialized with `isClient` and `initialState`
const ssr = ssrExchange({
  isClient: !isServerSide,
  initialState: !isServerSide ? window.__URQL_DATA__ : undefined,
})

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
