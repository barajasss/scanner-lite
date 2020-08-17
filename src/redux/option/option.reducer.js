import OptionActionTypes from './option.types'

const optionInitialState = {
	scanMode: false,
	outputMode: true,
	scrollImagesContainerFlag: false,
}

const optionReducer = (state = optionInitialState, action) => {
	switch (action.type) {
		case OptionActionTypes.SET_SCAN_MODE:
			return {
				...state,
				scanMode: action.payload,
			}
		case OptionActionTypes.SET_OUTPUT_MODE:
			return {
				...state,
				outputMode: action.payload,
			}
		case OptionActionTypes.SCROLL_IMAGES_CONTAINER:
			return {
				...state,
				scrollImagesContainerFlag: action.payload,
			}
		default:
			return state
	}
}

export default optionReducer
