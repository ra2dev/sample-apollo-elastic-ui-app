import {gql} from '@apollo/client'
import {EuiBasicTableProps} from '@elastic/eui'
import {SearchFilterConfig} from '@elastic/eui/src/components/search_bar/search_filters'

export const QUERY_GET_COUNTRIES = gql`
    query GetCountries {
        countries {
            code
            name
            phone
            continent {
                name
            }
            emoji
        }
    }
`

export interface Country {
    code: string
    name: string
    continent: string
    emoji: string
}

export const tableColumns: EuiBasicTableProps<Country>['columns'] = [
    {
        field: 'name',
        name: 'Country Name',
        sortable: true
    },
    {
        field: 'code',
        name: 'ISO Code',
        sortable: true
    },
    {
        field: 'emoji',
        name: 'Country Flag',
        sortable: true
    },
    {
        field: 'phone',
        name: 'Phone',
        sortable: true
    },
    {
        field: 'continent',
        name: 'Continent',
        sortable: true
    }
]

export const getFilters = (continents: string[]): SearchFilterConfig[] => [
    {
        type: 'field_value_selection',
        field: 'continent',
        name: 'Continent',
        multiSelect: 'or',
        options: () =>
            Promise.resolve(
                continents?.map((e: string) => ({
                    value: e,
                    view: e
                }))
            )
    }
]

export const searchSchema = {
    strict: true,
    fields: {
        name: {
            type: 'string'
        },
        code: {
            type: 'string'
        },
        continent: {
            type: 'string'
        },
        phone: {
            type: 'string'
        }
    }
}

/**
 * @note This interface can be generated automatically using apollo codegen
 * https://graphql-code-generator.com/docs/plugins/typescript-react-apollo
 * since this is demo app, we skipped this step.
 */

export interface GetCountriesResponse {
    countries?: {
        code: string
        name: string
        phone: string
        continent: {
            name: string
        }
        emoji: string
    }[]
}
