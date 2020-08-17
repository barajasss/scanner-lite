import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addImage, setPreviewImage } from '../../redux/image/image.actions'
import { scrollImagesContainer } from '../../redux/option/option.actions'
import {
	selectLastOriginalImage,
	selectLastScannedImage,
} from '../../redux/image/image.selectors'
import { getImageUrl } from '../../utils/imageProcessor'

class FileInput extends Component {
	componentDidUpdate() {
		const { lastOriginalImage, setPreviewImage } = this.props
		setPreviewImage(lastOriginalImage)
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
			addImage({
				originalImage: {
					name: file.name,
					url: imageUrl,
				},
				scannedImage: {
					name: file.name,
					url: imageUrl,
				},
			})
		}
		scrollImagesContainer(true)
	}
	render() {
		const { imagePicker } = this.props
		return (
			<input
				className='d-none form-control'
				id='image-picker'
				type='file'
				accept='image/*'
				multiple
				ref={imagePicker}
				onChange={this.handleAddImage}
			/>
		)
	}
}

const mapStateToProps = state => ({
	lastOriginalImage: selectLastOriginalImage(state),
	lastScannedImage: selectLastScannedImage(state),
})

const mapDispatchToProps = dispatch => ({
	addImage: img => dispatch(addImage(img)),
	setPreviewImage: img => dispatch(setPreviewImage(img)),
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
