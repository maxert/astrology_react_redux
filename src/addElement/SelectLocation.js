import React from 'react'
import { Select } from 'semantic-ui-react'

const countryOptions = [
  { key: '1', value: '1', text: 'GMT+2' },
  { key: '2', value: '2', text: 'GMT+3' },
  { key: '3', value: '3', text: 'GMT+4' },
  { key: '4', value: '4', text: 'GMT+5' },
  { key: '5', value: '5', text: 'GMT+6' },
 
]

export  const SelectLocation = () => (
  <Select placeholder='GMT+2' options={countryOptions} />
)

