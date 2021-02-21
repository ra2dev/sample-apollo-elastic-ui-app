import {makeAutoObservable} from 'mobx'

interface Filter {
    attribute: string
    comparison: string
    type: string
    value: string | Date | string[]
}

export class FilterStore  {
    constructor() {
        makeAutoObservable(this) // better to create class store and etend such type of functionality
    }

    filters: Filter[] = []

    addFilter = (filter: Filter) => {
        this.filters = [...this.filters, filter]
    }

    updateFilter = (filter: Filter) => {
        this.filters = this.filters.map(e => (e.attribute === filter.attribute ? filter : e))
    }
}

export const countryFilterStore = new FilterStore()
