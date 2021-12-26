import './app.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client'
import PageContainer from './components/PageContainer'
import CountryTable from './components/CountryTable/CountryTable'
import {ThemeContextProvider} from './context/ThemeContext/ThemeContext'

// Load css based on applied theme

const client = new ApolloClient({
  uri: process.env.API_URL || 'https://countries.trevorblades.com/',
  cache: new InMemoryCache()
})

ReactDOM.render(
  <React.StrictMode>
    <ThemeContextProvider>
      <ApolloProvider client={client}>
        <PageContainer>
          <CountryTable />
        </PageContainer>
      </ApolloProvider>
    </ThemeContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
