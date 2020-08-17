import ImageActionTypes from './image.types'

const addImage = img => ({
	type: ImageActionTypes.ADD,
	payload: img,
})

const removeImage = index => ({
	type: ImageActionTypes.REMOVE,
	payload: index,
})

const setCurrentImageIndex = index => ({
	type: ImageActionTypes.SET_CURRENT_IMAGE_INDEX,
	payload: index,
})
const moveImageLeft = index => ({
	type: ImageActionTypes.MOVE_LEFT,
	payload: index,
})

const moveImageRight = index => ({
	type: ImageActionTypes.MOVE_RIGHT,
	payload: index,
})

export {
	addImage,
	removeImage,
	moveImageLeft,
	moveImageRight,
	setCurrentImageIndex,
}
