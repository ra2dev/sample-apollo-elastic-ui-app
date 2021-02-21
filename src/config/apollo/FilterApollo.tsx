import {useQuery} from '@apollo/client'
import React from 'react'
import {filtersInVar} from './apollo'
import * as query from './filter.query'

export default function FilterApollo() {
    const {
        data: {filters}
    } = useQuery(query.QUERY_FILTERS)

    const addFilter = (additionalFilter: any) => {
        filtersInVar([...filters, additionalFilter])
    }

    const updateFilter = (updateFilter: any) => {
        filtersInVar(filters.map((e: any) => e.attribute === updateFilter.attribute))
    }

    // TBD
    return (
        <div>
            {JSON.stringify(filters, null, 4)}
            <button onClick={() => addFilter({})}>Add Filter</button>
            <button onClick={() => updateFilter({})}>Update Filter</button>
            <br />
            <br />
            <br />
        </div>
    )
}

export const TestAdditionalReRender = () => {
    const {
        data: {isLoggedIn}
    } = useQuery(query.QUERY_LOGGED_IN)

    return <div>{JSON.stringify(isLoggedIn, null, 4)}</div>
}
