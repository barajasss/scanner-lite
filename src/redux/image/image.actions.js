import ImageActionTypes from './image.types'

const addImage = img => ({
	type: ImageActionTypes.ADD,
	payload: img,
})

const removeImage = id => ({
	type: ImageActionTypes.REMOVE,
	payload: id,
})

const setPreviewImage = img => ({
	type: ImageActionTypes.SET_PREVIEW,
	payload: img,
})
const moveImageLeft = id => ({
	type: ImageActionTypes.MOVE_LEFT,
	payload: id,
})

const moveImageRight = id => ({
	type: ImageActionTypes.MOVE_RIGHT,
	payload: id,
})

export { addImage, removeImage, moveImageLeft, moveImageRight, setPreviewImage }
