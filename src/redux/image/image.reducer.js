import { v4 as uuidv4 } from 'uuid'
import ImageActionTypes from './image.types'

const initialImageState = {
	previewImage: null,
	originalImages: [],
	scannedImages: [],
}

const imageReducer = (state = initialImageState, action) => {
	switch (action.type) {
		case ImageActionTypes.ADD: {
			const { originalImage, scannedImage } = action.payload
			return {
				...state,
				originalImages: [
					...state.originalImages,
					{
						id: uuidv4(),
						...originalImage,
					},
				],
				scannedImages: [
					...state.scannedImages,
					{
						id: uuidv4(),
						...scannedImage,
					},
				],
			}
		}
		case ImageActionTypes.REMOVE:
			return {
				...state,
				originalImages: [...state.originalImages].filter(
					img => img.id !== action.payload
				),
				scannedImages: [...state.scannedImages].filter(
					img => img.id !== action.payload
				),
			}
		case ImageActionTypes.SET_PREVIEW:
			return {
				...state,
				previewImage: action.payload,
			}
		default:
			return state
	}
}

export default imageReducer