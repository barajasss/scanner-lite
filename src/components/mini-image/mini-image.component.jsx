import React, { Component } from 'react'
import { setPreviewImage } from '../../redux/image/image.actions'
import { connect } from 'react-redux'

import './mini-image.styles.scss'

class MiniImage extends Component {
	selectImage = () => {
		const {
			img: { id, name, url },
			setPreviewImage,
		} = this.props
		setPreviewImage({
			id,
			name,
			url,
		})
	}
	render() {
		const {
			img: { id, name, url },
			previewImage,
		} = this.props
		return (
			<img
				className={`mini-image-preview ${
					previewImage && previewImage.id === id ? 'selected' : ''
				}`}
				src={url}
				alt={name}
				onClick={this.selectImage}
			/>
		)
	}
}

const mapStateToProps = state => ({
	previewImage: state.image.previewImage,
})

const mapDispatchToProps = dispatch => ({
	setPreviewImage: img => dispatch(setPreviewImage(img)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MiniImage)
