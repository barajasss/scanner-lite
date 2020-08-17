import { v4 as uuidv4 } from 'uuid'
import ImageActionTypes from './image.types'

const initialImageState = {
	currentImageIndex: 0,
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
		case ImageActionTypes.REMOVE: {
			let updatedImageIndex = state.currentImageIndex
			if (state.originalImages.length === 1) {
				updatedImageIndex = 0
			} else if (
				state.currentImageIndex ===
				state.originalImages.length - 1
			) {
				if (updatedImageIndex > 0) updatedImageIndex--
			}
			return {
				...state,
				currentImageIndex: updatedImageIndex,
				originalImages: [...state.originalImages].filter(
					(img, index) => index !== action.payload
				),
				scannedImages: [...state.scannedImages].filter(
					(img, index) => index !== action.payload
				),
			}
		}
		case ImageActionTypes.MOVE_LEFT: {
			let updatedImageIndex = state.currentImageIndex
			let updatedOriginalImages, updatedScannedImages
			if (updatedImageIndex > 0) {
				updatedImageIndex--

				// swap the value to the left array element in original images

				updatedOriginalImages = [...state.originalImages]
				let temp = updatedOriginalImages[state.currentImageIndex]
				updatedOriginalImages[state.currentImageIndex] =
					updatedOriginalImages[updatedImageIndex]
				updatedOriginalImages[updatedImageIndex] = temp

				// swap the value to the left of array element in scanned images

				updatedScannedImages = [...state.scannedImages]
				temp = updatedScannedImages[state.currentImageIndex]
				updatedScannedImages[state.currentImageIndex] =
					updatedScannedImages[updatedImageIndex]
				updatedScannedImages[updatedImageIndex] = temp
			}
			return {
				...state,
				currentImageIndex: updatedImageIndex,
				originalImages: updatedOriginalImages,
				scannedImages: updatedScannedImages,
			}
		}
		case ImageActionTypes.MOVE_RIGHT: {
			let updatedImageIndex = state.currentImageIndex
			let updatedOriginalImages, updatedScannedImages
			if (updatedImageIndex < state.originalImages.length - 1) {
				updatedImageIndex++

				// swap the value to the left array element in original images

				updatedOriginalImages = [...state.originalImages]
				let temp = updatedOriginalImages[state.currentImageIndex]
				updatedOriginalImages[state.currentImageIndex] =
					updatedOriginalImages[updatedImageIndex]
				updatedOriginalImages[updatedImageIndex] = temp

				// swap the value to the left of array element in scanned images

				updatedScannedImages = [...state.scannedImages]
				temp = updatedScannedImages[state.currentImageIndex]
				updatedScannedImages[state.currentImageIndex] =
					updatedScannedImages[updatedImageIndex]
				updatedScannedImages[updatedImageIndex] = temp
			}
			return {
				...state,
				currentImageIndex: updatedImageIndex,
				originalImages: updatedOriginalImages,
				scannedImages: updatedScannedImages,
			}
		}
		case ImageActionTypes.SET_CURRENT_IMAGE_INDEX:
			return {
				...state,
				currentImageIndex: action.payload,
			}
		case ImageActionTypes.CLEAR_IMAGES:
			return initialImageState
		default:
			return state
	}
}

export default imageReducer
