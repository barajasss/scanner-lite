import imageReducer from './image/image.reducer'
import optionReducer from './option/option.reducer'

import { combineReducers } from 'redux'

const rootReducer = combineReducers({
	image: imageReducer,
	option: optionReducer,
})

export default rootReducer
