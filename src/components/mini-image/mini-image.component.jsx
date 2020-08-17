import React, { Component } from 'react'
import { setCurrentImageIndex } from '../../redux/image/image.actions'
import { connect } from 'react-redux'

import './mini-image.styles.scss'

class MiniImage extends Component {
	selectImage = () => {
		const { index, setCurrentImageIndex } = this.props
		setCurrentImageIndex(index)
	}
	render() {
		const {
			img: { name, url },
			index,
			currentImageIndex,
		} = this.props
		return (
			<img
				className={`mini-image-preview ${
					currentImageIndex === index ? 'selected' : ''
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
	currentImageIndex: state.image.currentImageIndex,
})

const mapDispatchToProps = dispatch => ({
	setCurrentImageIndex: index => dispatch(setCurrentImageIndex(index)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MiniImage)
