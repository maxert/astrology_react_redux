import React, { useContext } from 'react'
import { Select } from 'semantic-ui-react'
import { ReduceContext } from '../context/reducerContext'
//Блок с выбором
const countryOptions = [
  { key: '0', value: '0', text: 'GMT+2' },
  { key: '1', value: '1', text: 'GMT+3' },
  { key: '2', value: '2', text: 'GMT+4' },
  { key: '3', value: '3', text: 'GMT+5' },
  { key: '4', value: '4', text: 'GMT+6' },
]

function SelectLocation(){
  const {SelectLocation} = useContext(ReduceContext);
  return(
  <Select placeholder='GMT+2' options={countryOptions} onChange={(e, { value}) => SelectLocation(countryOptions[value].text)}/>
  )
}

export default SelectLocation;