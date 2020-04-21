import React from 'react'
import { Select } from 'semantic-ui-react'

//Блок с выбором
const countryOptions = [
  { key: '1', value: 'hour', text: 'Час' },
  { key: '2', value: 'day', text: 'День' },
  { key: '3', value: 'week', text: 'Неделя' },
  { key: '4', value: 'month', text: 'Месяц' },
  { key: '5', value: 'year', text: 'Год' },
]

export const SelectWeeks = ({SelectSubmite,ValueWeeeks}) => (
  <Select placeholder='Неделя' name="type" value={ValueWeeeks}  options={countryOptions} onChange={(event,data)=>SelectSubmite(event,data)}  />
)

