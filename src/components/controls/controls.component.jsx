import React, { Component, createRef } from 'react'
import FileInput from '../file-input/file-input.component'

import { setOutputMode, setScanMode } from '../../redux/option/option.actions'
import { connect } from 'react-redux'

class Controls extends Component {
	constructor() {
		super()
		this.imagePicker = createRef()
	}
	openImagePicker = () => {
		this.imagePicker.current.click()
	}
	render() {
		const { setOutputMode, setScanMode, scanMode, outputMode } = this.props
		return (
			<div>
				<div className='btn-group d-flex flex-row'>
					<button className='btn btn-dark p-0 border-right'>
						<label
							className='btn btn-dark m-0 btn-block'
							style={{ cursor: 'pointer' }}>
							Output 1 image/page{' '}
							<input
								id='single-image-output'
								type='checkbox'
								onChange={e => setOutputMode(e.target.checked)}
								defaultChecked={outputMode}
							/>
						</label>
					</button>
					<button className='btn btn-dark p-0 border-left'>
						<label
							className='btn btn-dark m-0 btn-block'
							style={{ cursor: 'pointer' }}>
							<i className='fas fa-search'></i> Scan Mode{' '}
							<input
								id='scan-mode-input'
								type='checkbox'
								onChange={e => setScanMode(e.target.checked)}
								defaultChecked={scanMode}
							/>
						</label>
					</button>
				</div>
				<div className='btn-group d-flex flex-row mt-3'>
					<button
						className='btn btn-danger'
						id='add-image-btn'
						onClick={this.openImagePicker}>
						<i className='fas fa-camera'></i> Take Photo / Add Image
					</button>
					<button id='generate-pdf-btn' className='btn btn-primary'>
						<i className='fas fa-download'></i> PDF
					</button>
				</div>
				<br />
				<FileInput ref={this.imagePicker} />
			</div>
		)
	}
}

const mapStateToProps = ({ option: { outputMode, scanMode } }) => ({
	outputMode,
	scanMode,
})

const mapDispatchToProps = dispatch => ({
	setOutputMode: outputFlag => dispatch(setOutputMode(outputFlag)),
	setScanMode: scanFlag => dispatch(setScanMode(scanFlag)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Controls)
