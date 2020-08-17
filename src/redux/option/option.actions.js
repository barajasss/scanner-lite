import OptionActionTypes from './option.types'

const setScanMode = scanMode => ({
	type: OptionActionTypes.SET_SCAN_MODE,
	payload: scanMode,
})

const setOutputMode = outputMode => ({
	type: OptionActionTypes.SET_OUTPUT_MODE,
	payload: outputMode,
})

const scrollImagesContainer = scrollFlag => ({
	type: OptionActionTypes.SCROLL_IMAGES_CONTAINER,
	payload: scrollFlag,
})

export { setOutputMode, setScanMode, scrollImagesContainer }
