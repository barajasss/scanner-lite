import React, { Component } from 'react'
import { connect } from 'react-redux'

import './image-preview.styles.scss'

class ImagePreview extends Component {
	render() {
		const { previewImage } = this.props
		let name, url
		if (previewImage) {
			;({ name, url } = previewImage)
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

const mapStateToProps = ({ image: { previewImage } }) => ({ previewImage })

export default connect(mapStateToProps)(ImagePreview)
