import React from 'react'
import { Select } from 'semantic-ui-react'
//Блок с выбором
const countryOptions = [
  { key: '1', value: '1', text: 'Час' },
  { key: '2', value: '2', text: 'День' },
  { key: '3', value: '3', text: 'Неделя' },
  { key: '4', value: '4', text: 'Месяц' },
  { key: '5', value: '5', text: 'Год' },
]

export const SelectWeeks = () => (
  <Select placeholder='Неделя' options={countryOptions} />
)

