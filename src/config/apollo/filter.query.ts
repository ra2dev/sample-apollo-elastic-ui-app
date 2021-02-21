import {gql} from '@apollo/client'

export const MUTATION_ADD_FILTER = gql`
    mutation updateFilter($filterInput: FilterInputProps!) {
        updateFilter(filterInput: $filterInput)
    }
`

export const QUERY_FILTERS = gql`
    query GetFilters {
        filters @client
    }
`

export const QUERY_LOGGED_IN = gql`
    query GetFilters {
        isLoggedIn @client
    }
`
