import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addImage, setCurrentImageIndex } from '../../redux/image/image.actions'
import { scrollImagesContainer } from '../../redux/option/option.actions'
import { selectTotalImages } from '../../redux/image/image.selectors'

import { getImageUrl, getScannedImageUrl } from '../../utils/imageProcessor'

class FileInput extends Component {
	constructor() {
		super()
		this.canvas = React.createRef()
	}
	componentDidUpdate() {
		const { totalImages, setCurrentImageIndex } = this.props
		setCurrentImageIndex(totalImages - 1)
	}
	handleAddImage = async () => {
		const { imagePicker, addImage, scrollImagesContainer } = this.props
		imagePicker.current.blur()
		if (imagePicker.current.files.length === 0) {
			return
		}
		for (let file of imagePicker.current.files) {
			if (!file.type.startsWith('image')) {
				alert('only images allowed')
				return
			}
			const imageUrl = await getImageUrl(file)
			const scannedImageUrl = await getScannedImageUrl(
				this.canvas.current,
				imageUrl
			)
			addImage({
				originalImage: {
					name: file.name,
					url: imageUrl,
				},
				scannedImage: {
					name: file.name,
					url: scannedImageUrl,
				},
			})
		}
		scrollImagesContainer(true)
	}
	render() {
		const { imagePicker } = this.props
		return (
			<div>
				<canvas ref={this.canvas} style={{ display: 'none' }}></canvas>
				<input
					className='d-none form-control'
					id='image-picker'
					type='file'
					accept='image/*'
					multiple
					ref={imagePicker}
					onChange={this.handleAddImage}
					onClick={e => (e.target.value = null)}
				/>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	totalImages: selectTotalImages(state),
})

const mapDispatchToProps = dispatch => ({
	addImage: img => dispatch(addImage(img)),
	setCurrentImageIndex: index => dispatch(setCurrentImageIndex(index)),
	scrollImagesContainer: scrollFlag =>
		dispatch(scrollImagesContainer(scrollFlag)),
})

const ConnectedFileInput = connect(
	mapStateToProps,
	mapDispatchToProps
)(FileInput)

export default React.forwardRef((props, ref) => (
	<ConnectedFileInput {...props} imagePicker={ref} />
))
