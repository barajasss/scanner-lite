import ImageActionTypes from './image.types'

const addImage = img => ({
	type: ImageActionTypes.ADD,
	payload: img,
})

const removeImage = id => ({
	type: ImageActionTypes.REMOVE,
	payload: id,
})

const setCurrentImageIndex = index => ({
	type: ImageActionTypes.SET_CURRENT_IMAGE_INDEX,
	payload: index,
})
const moveImageLeft = id => ({
	type: ImageActionTypes.MOVE_LEFT,
	payload: id,
})

const moveImageRight = id => ({
	type: ImageActionTypes.MOVE_RIGHT,
	payload: id,
})

export {
	addImage,
	removeImage,
	moveImageLeft,
	moveImageRight,
	setCurrentImageIndex,
}
