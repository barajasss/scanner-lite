import React, { Component } from 'react'

import ImagesContainer from '../../components/images-container/images-container.component'
import Controls from '../../components/controls/controls.component'
import ImagePreview from '../../components/image-preview/image-preview.component'

import './home.styles.scss'

class HomePage extends Component {
	render() {
		return (
			<div>
				<div className='container main-container'>
					<Controls />
					<ImagePreview />
				</div>
				<ImagesContainer />
			</div>
		)
	}
}

export default HomePage
