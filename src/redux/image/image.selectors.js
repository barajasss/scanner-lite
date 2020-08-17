import { createSelector } from 'reselect'

const selectImage = state => state.image

const selectOriginalImages = createSelector(
	selectImage,
	img => img.originalImages
)
const selectScannedImages = createSelector(
	selectImage,
	img => img.scannedImages
)

const selectLastOriginalImage = createSelector(
	selectOriginalImages,
	originalImages => {
		// console.log('selector', originalImages[originalImages.length - 1])
		return originalImages[originalImages.length - 1]
	}
)

const selectTotalImages = createSelector(
	selectOriginalImages,
	originalImages => originalImages.length
)

const selectLastScannedImage = createSelector(
	selectScannedImages,
	scannedImages => scannedImages[scannedImages.length - 1]
)

export {
	selectOriginalImages,
	selectScannedImages,
	selectLastOriginalImage,
	selectLastScannedImage,
	selectTotalImages,
}
