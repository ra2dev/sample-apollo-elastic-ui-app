import React from 'react'
import ReactDOM from 'react-dom'
import './app.css'
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client'
import PageContainer from './components/PageContainer'
import CountryTable from './components/CountryTable/CountryTable'

// Load css based on applied theme
if (window.location.hash?.includes('dark')) {
    require('@elastic/eui/dist/eui_theme_dark.css')
} else {
    require('@elastic/eui/dist/eui_theme_light.css')
}

const client = new ApolloClient({
    uri: process.env.API_URL || 'https://countries.trevorblades.com/',
    cache: new InMemoryCache()
})

ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <PageContainer>
                <CountryTable />
            </PageContainer>
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById('root')
)
