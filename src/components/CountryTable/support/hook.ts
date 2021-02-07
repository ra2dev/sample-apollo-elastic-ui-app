import {useState} from 'react'
import {Criteria, EuiBasicTableProps, Pagination, Query} from '@elastic/eui'
import {Country, GetCountriesResponse} from './constants'
import {extractTableData} from './helpers'
import {CountryFilterProps} from '../CountryFilter'

const PAGE_SIZE_OPTIONS = [10, 50, 100]

interface UseCountryTableState {
    tableProps: Pick<EuiBasicTableProps<Country>, 'items' | 'sorting' | 'onChange'> & {
        pagination: Pagination
    }
    searchProps: CountryFilterProps
}

interface State {
    page: number | undefined
    size: number | undefined
    sort: keyof Country // for nested structure need advanced type
    direction: 'asc' | 'desc'
    query: Query | undefined
    searchError: Error | undefined
}

/**
 * Country table state Hook. Used to handle sorting|pagination (on client side)
 * @note Since it's demo app - implementation are specific to country table, but it's easy to make it more generic.
 */
export const useCountryTableState = (res: GetCountriesResponse | undefined = {}): UseCountryTableState => {
    const countries = res?.countries?.map(e => ({...e, continent: e?.continent?.name, phone: `+${e?.phone}`}))
    const continents: string[] = [...new Set(countries?.map(e => e.continent).filter(Boolean))]


    // Pagination
    const [page, setPage] = useState<State['page']>(0)
    const [size, setSize] = useState<State['size']>(10)

    // Sorting
    const [sort, setSort] = useState<State['sort']>('name')
    const [direction, setDirection] = useState<State['direction']>('asc')

    // Filtering
    const [query, setQuery] = useState<State['query']>()
    const [searchError, setSearchError] = useState<State['searchError']>()

    const {items, totalItemCount} = extractTableData<Country>(countries, {page, size, sort, direction, query})

    const onChange = (criteria: Criteria<Country>) => {
        setPage(criteria.page?.index)
        setSize(criteria.page?.size)
        setSort(criteria.sort?.field ?? sort)
        setDirection(criteria.sort?.direction ?? direction)
    }

    const pagination = {
        pageIndex: page ?? 0,
        pageSize: size ?? 10,
        totalItemCount: totalItemCount,
        pageSizeOptions: PAGE_SIZE_OPTIONS
    }

    const sorting = {
        sort: {
            field: sort,
            direction: direction
        }
    }

    return {
        searchProps: {continents, query, setQuery, searchError, setSearchError},
        tableProps: {items, sorting, onChange, pagination}
    }
}
