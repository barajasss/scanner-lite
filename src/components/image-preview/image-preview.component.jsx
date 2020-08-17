import React, { Component } from 'react'
import { connect } from 'react-redux'

import './image-preview.styles.scss'

class ImagePreview extends Component {
	constructor() {
		super()
		this.state = {
			flash: false,
		}
	}
	componentDidUpdate(prevProps) {
		if (this.props.currentImageIndex !== prevProps.currentImageIndex) {
			this.setState(
				{
					flash: true,
				},
				() => {
					setTimeout(() => {
						this.setState({
							flash: false,
						})
					}, 400)
				}
			)
		}
	}
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
		const { flash } = this.state
		return (
			<div id='image-container'>
				{previewImage ? (
					<img
						id='image-preview'
						src={url}
						className={`img-fluid ${flash ? 'flash' : ''}`}
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
