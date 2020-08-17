import { createStore, applyMiddleware } from 'redux'
import rootReducer from './rootReducer'
import reduxLogger from 'redux-logger'

const store = createStore(rootReducer, applyMiddleware(reduxLogger))

export default store
