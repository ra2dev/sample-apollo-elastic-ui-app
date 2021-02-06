import {Comparators, EuiSearchBar} from '@elastic/eui'

// Same as in https://lodash.com/docs/4.17.15#isNil
const isNil = (el: unknown) => el == null

/**
 * Pure function to extract items (based on pagination|sort ) and pagination
 */
export const extractTableData = <T>(
    data: T[] | undefined,
    {page, size, sort, direction, query}: any
): {items: T[]; totalItemCount: number} => {
    const filteredItems = query
        ? EuiSearchBar.Query.execute(query, data ?? [], {
              defaultFields: ['name', 'code', 'continent.name']
          })
        : data ?? []

    let result: T[] = filteredItems

    if (sort) {
        result = result.slice(0).sort(Comparators.property(sort, Comparators.default(direction)))
    }

    if (!isNil(page) || !isNil(size)) {
        const startIndex = page * size
        result = result?.slice(startIndex, Math.min(startIndex + size, result?.length))
    }

    return {
        items: result,
        totalItemCount: filteredItems?.length ?? 0
    }
}
