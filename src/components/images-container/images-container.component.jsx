import React, { Component } from 'react'
import './images-container.styles.scss'
import { scrollImagesContainer } from '../../redux/option/option.actions'

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
		const { originalImages, scannedImages } = this.props
		if (originalImages.length === 0 || scannedImages.length === 0) {
			return <div></div>
		}
		return (
			<div id='images-container' ref={this.imagesContainerEl}>
				{originalImages.map(img => (
					<MiniImage key={img.id} img={img} />
				))}
			</div>
		)
	}
}

const mapStateToProps = state => {
	const {
		image: { originalImages, scannedImages },
		option: { scrollImagesContainerFlag },
	} = state
	return {
		originalImages,
		scannedImages,
		scrollImagesContainerFlag,
	}
}

const mapDispatchToProps = dispatch => ({
	scrollImagesContainer: scrollFlag =>
		dispatch(scrollImagesContainer(scrollFlag)),
})
export default connect(mapStateToProps, mapDispatchToProps)(ImagesContainer)
