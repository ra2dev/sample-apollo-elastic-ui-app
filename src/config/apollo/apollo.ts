import {gql, InMemoryCache, makeVar} from '@apollo/client'

export const filtersInVar = makeVar<any[]>([
    {
        attribute: 'attribute',
        comparison: 'comparison',
        type: 'type',
        value: 'value'
    }
])

export const isLoggedInVar = makeVar(true)

export const clientConfig = {
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    filters: {
                        read() {
                            return filtersInVar()
                        }
                    },
                    isLoggedIn: {
                        read() {
                            return isLoggedInVar()
                        }
                    }
                }
            }
        }
    }),
    typeDefs: gql`
        type Filter {
            attribute: String!
            comparison: String!
            type: String!
            value: String!
        }

        input FilterInputProps {
            attribute: String!
            comparison: String!
            type: String!
            value: String!
        }

        extend type Query {
            filters: [Filter]!
            isLoggedIn: Boolean!
        }

        extend type Mutation {
            updateFilter(filter: FilterInputProps!): String
        }
    `
}
