import React, { Component } from 'react'
import {
	setCurrentImageIndex,
	removeImage,
	moveImageLeft,
	moveImageRight,
} from '../../redux/image/image.actions'
import { connect } from 'react-redux'
import { selectTotalImages } from '../../redux/image/image.selectors'

import './mini-image.styles.scss'

class MiniImage extends Component {
	selectImage = () => {
		const { index, setCurrentImageIndex } = this.props
		setCurrentImageIndex(index)
	}
	removeImageHandler = () => {
		const { index, removeImage } = this.props
		removeImage(index)
	}
	render() {
		const {
			img: { name, url },
			index,
			currentImageIndex,
			moveImageLeft,
			moveImageRight,
			totalImages,
		} = this.props
		const selected = currentImageIndex === index
		return (
			<div className='mini-image-preview-container'>
				<button
					className='mini-image-preview-close'
					onClick={this.removeImageHandler}>
					<i className='fas fa-times' />
				</button>
				{selected && (
					<div className='mini-image-preview-mover'>
						{index !== 0 && (
							<button
								className='mini-image-movers mover-left'
								onClick={() => moveImageLeft(index)}>
								<i className='fas fa-chevron-left' />
							</button>
						)}
						{index !== totalImages - 1 && (
							<button
								className='mini-image-movers mover-right'
								onClick={() => moveImageRight(index)}>
								<i className='fas fa-chevron-right' />
							</button>
						)}
						}
					</div>
				)}
				<img
					className={`mini-image-preview ${
						selected ? 'selected' : ''
					}`}
					src={url}
					alt={name}
					onClick={this.selectImage}
				/>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	previewImage: state.image.previewImage,
	currentImageIndex: state.image.currentImageIndex,
	totalImages: selectTotalImages(state),
})

const mapDispatchToProps = dispatch => ({
	setCurrentImageIndex: index => dispatch(setCurrentImageIndex(index)),
	removeImage: index => dispatch(removeImage(index)),
	moveImageLeft: index => dispatch(moveImageLeft(dispatch)),
	moveImageRight: index => dispatch(moveImageRight(dispatch)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MiniImage)
