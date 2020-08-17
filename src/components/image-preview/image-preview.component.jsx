import React, { Component } from 'react'
import { connect } from 'react-redux'

import './image-preview.styles.scss'

class ImagePreview extends Component {
	render() {
		const {
			currentImageIndex,
			originalImages,
			scannedImages,
			scanMode,
		} = this.props
		let previewImage, url, name
		if (originalImages.length !== 0) {
			if (scanMode) {
				previewImage = scannedImages[currentImageIndex]
			} else {
				previewImage = originalImages[currentImageIndex]
			}
			;({ url, name } = previewImage)
		}
		return (
			<div id='image-container'>
				{previewImage ? (
					<img
						id='image-preview'
						src={url}
						className='img-fluid'
						alt={`${name} preview`}
					/>
				) : (
					<h3>Start Adding Images</h3>
				)}
			</div>
		)
	}
}

const mapStateToProps = ({
	image: { currentImageIndex, scannedImages, originalImages },
	option: { scanMode },
}) => ({
	currentImageIndex,
	scannedImages,
	originalImages,
	scanMode,
})

export default connect(mapStateToProps)(ImagePreview)
