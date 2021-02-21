import {observer} from 'mobx-react'
import React from 'react'
import {countryFilterStore} from './filter'

interface FilterApolloProps {
    store: typeof countryFilterStore
}

export const FilterApollo = observer(({store}: FilterApolloProps) => {
    return (
        <Implementation>
            {JSON.stringify(store.filters, null, 4)}
            <button onClick={() => store.addFilter({} as any)}>Add Filter</button>
            <button onClick={() => store.updateFilter({} as any)}>Update Filter</button>
        </Implementation>
    )
})

export default FilterApollo
