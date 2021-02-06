import React from 'react'
import {EuiCallOut, EuiFlexGroup, EuiFlexItem, EuiSearchBar, EuiSearchBarProps, EuiSpacer, Query} from '@elastic/eui'
import {getFilters, searchSchema} from './support/constants'

export interface CountryFilterProps {
    continents: string[]
    query?: Query
    setQuery: (query?: Query) => void
    setSearchError: (error?: Error) => void
    searchError?: Error
}

export default function CountryFilter({continents, query, setQuery, setSearchError, searchError}: CountryFilterProps) {
    const onChange: EuiSearchBarProps['onChange'] = ({query, error}) => {
        if (error) {
            setSearchError(error)
        } else {
            setSearchError(undefined)
            setQuery(query || undefined)
        }
    }

    return (
        <>
            <EuiFlexGroup className='app-search-box' wrap>
                <EuiSearchBar
                    query={query}
                    box={{
                        placeholder: 'Search',
                        schema: searchSchema
                    }}
                    filters={getFilters(continents)}
                    onChange={onChange}
                />
            </EuiFlexGroup>
            <EuiSpacer size='l' />
            <EuiFlexItem grow={false} className='app-search-box'>
                {searchError && (
                    <div>
                        <EuiCallOut title={`Invalid search: ${searchError?.message}`} color='danger' iconType='alert' />
                    </div>
                )}
            </EuiFlexItem>
        </>
    )
}
