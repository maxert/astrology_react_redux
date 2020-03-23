import { combineReducers } from 'redux'
import Persons from './personReducer/personReducer'
import Reducer from './reducer'

export default combineReducers({
    Persons,
    Reducer
})
console.log(Persons);