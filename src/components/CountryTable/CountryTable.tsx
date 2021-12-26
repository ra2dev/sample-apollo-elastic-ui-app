import {EuiBasicTable, EuiCallOut, EuiButton, EuiSpacer, EuiFlexGroup} from '@elastic/eui'
import {useQuery} from '@apollo/client'
import {QUERY_GET_COUNTRIES, GetCountriesResponse, Country, tableColumns} from './support/constants'
import {useCountryTableState} from './support/hook'
import React from 'react'
import CountryFilter from './CountryFilter'

export default function CountryTable() {
  const {loading, error, data, refetch} = useQuery<GetCountriesResponse>(QUERY_GET_COUNTRIES)
  const {tableProps, searchProps} = useCountryTableState(data)

  if (error) {
    return (
      <>
        <EuiCallOut
          title={error?.message ?? 'Failed to load countries, please contact support.'}
          color='danger'
          iconType='alert'
        />
        <EuiSpacer size='m' />
        <EuiButton onClick={refetch} isLoading={loading}>
          Fetch Again
        </EuiButton>
      </>
    )
  }

  return (
    <>
      <CountryFilter {...searchProps} />
      <EuiSpacer size='l' />
      <EuiBasicTable<Country> columns={tableColumns} loading={loading} {...tableProps} />
    </>
  )
}
