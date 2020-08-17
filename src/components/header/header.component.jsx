import React, { Component } from 'react'

class Header extends Component {
	render() {
		return (
			<div className='bg-primary'>
				<div className='container text-white'>
					<h2 className='pt-2 mb-0'>Scanner Lite</h2>
					<small className='pb-1 d-block'>
						Group images into one pdf quickly!{' '}
					</small>
				</div>
			</div>
		)
	}
}

export default Header
