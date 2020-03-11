import React from 'react'
import { Select } from 'semantic-ui-react'
//Блок с выбором
const countryOptions = [
  { key: '1', value: '1', text: 'Доллар США' },
  { key: '2', value: '2', text: 'Евро' },
  { key: '3', value: '3', text: 'Английский фунт стерлингов' },
  { key: '4', value: '4', text: 'Швейцарский франк' },
  { key: '5', value: '5', text: 'Японская йена' },
  { key: '6', value: '6', text: 'Австралийский Доллар' },
  { key: '7', value: '7', text: 'Новозеландский Доллар' },
  { key: '8', value: '8', text: 'Шведская Крона' },
  { key: '9', value: '9', text: 'Российский Рубль' },
]

export  const SelectCurrentry = () => (
  <Select placeholder='Не выбрано' options={countryOptions} />
)

