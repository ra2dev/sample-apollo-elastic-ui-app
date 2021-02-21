import './app.css'

import React from 'react'
import ReactDOM from 'react-dom'
import {ApolloClient, ApolloProvider} from '@apollo/client'
import PageContainer from './components/PageContainer'
import CountryTable from './components/CountryTable/CountryTable'
import {clientConfig} from './config/apollo/apollo'

// Load css based on applied theme
if (window.location.hash?.includes('dark')) {
    require('@elastic/eui/dist/eui_theme_dark.css')
} else {
    require('@elastic/eui/dist/eui_theme_light.css')
}

export const client = new ApolloClient({
    uri: process.env.API_URL || 'https://countries.trevorblades.com/',
    ...clientConfig
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
