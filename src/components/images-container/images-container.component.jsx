import React, { Component } from 'react'
import './images-container.styles.scss'
import { scrollImagesContainer } from '../../redux/option/option.actions'
import { clearImages } from '../../redux/image/image.actions'

import MiniImage from '../mini-image/mini-image.component'
import { connect } from 'react-redux'

class ImagesContainer extends Component {
	constructor() {
		super()
		this.imagesContainerEl = React.createRef()
	}
	componentDidUpdate() {
		const { scrollImagesContainer, scrollImagesContainerFlag } = this.props
		if (scrollImagesContainerFlag) {
			const imagesContainer = this.imagesContainerEl.current
			imagesContainer.scrollLeft = imagesContainer.scrollWidth + 10000
			setTimeout(() => (imagesContainer.scrollLeft += 1000), 0)
			scrollImagesContainer(false)
		}
	}
	render() {
		const {
			originalImages,
			scannedImages,
			scanMode,
			clearImages,
		} = this.props
		if (originalImages.length === 0 || scannedImages.length === 0) {
			return <div></div>
		}
		return (
			<div id='images-container' ref={this.imagesContainerEl}>
				<button
					style={{
						minWidth: '100px',
						margin: '5px 10px',
						alignSelf: 'stretch',
					}}
					className='btn btn-light text-danger'
					onClick={() => clearImages()}>
					<i className='fas fa-times fa-lg' /> <br />
					Clear All
				</button>
				<div
					style={{
						minWidth: '2px',
						background: '#777',
						alignSelf: 'stretch',
						margin: '5px 10px',
					}}></div>
				{scanMode
					? scannedImages.map((img, i) => (
							<MiniImage index={i} key={img.id} img={img} />
					  ))
					: originalImages.map((img, i) => (
							<MiniImage index={i} key={img.id} img={img} />
					  ))}
			</div>
		)
	}
}

const mapStateToProps = state => {
	const {
		image: { originalImages, scannedImages },
		option: { scrollImagesContainerFlag, scanMode },
	} = state
	return {
		originalImages,
		scannedImages,
		scanMode,
		scrollImagesContainerFlag,
	}
}

const mapDispatchToProps = dispatch => ({
	scrollImagesContainer: scrollFlag =>
		dispatch(scrollImagesContainer(scrollFlag)),
	clearImages: () => dispatch(clearImages()),
})
export default connect(mapStateToProps, mapDispatchToProps)(ImagesContainer)
