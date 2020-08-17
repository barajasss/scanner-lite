import React, { Component, createRef } from 'react'
import FileInput from '../file-input/file-input.component'

import { setOutputMode, setScanMode } from '../../redux/option/option.actions'
import { connect } from 'react-redux'

class Controls extends Component {
	constructor() {
		super()
		this.state = {
			generatingPdf: false,
		}
		this.imagePicker = createRef()
	}
	downloadPdf = () => {
		this.setState({
			generatingPdf: true,
		})
		const {
			scanMode,
			outputMode,
			originalImages,
			scannedImages,
		} = this.props
		let images = []
		if (scanMode) {
			images = scannedImages
		} else {
			images = originalImages
		}
		// create elements for html2pdf
		const div = document.createElement('div')
		for (let image of images) {
			const pageBreak = document.createElement('div')
			pageBreak.className = 'html2pdf__page-break'

			const pdfImage = document.createElement('img')
			pdfImage.src = image.url
			pdfImage.style.marginTop = '15px'
			pdfImage.style.borderBottom = '1px solid #888'
			pdfImage.style.height = 'auto'
			pdfImage.style.width = '100%'
			// pdfImage.style.maxWidth = '100%'
			pdfImage.style.display = 'block'

			if (outputMode) {
				pdfImage.style.maxHeight = '1120px'
				pdfImage.style.marginTop = '1px'
				pdfImage.style.borderBottom = 'none'
			}
			div.appendChild(pdfImage)

			if (outputMode) {
				pdfImage.style.borderBottom = 'none'
				div.appendChild(pageBreak)
			}
		}

		const opt = {
			filename: 'document.pdf',
			margin: 0,
			image: { type: 'jpeg', quality: 0.98 },
			html2canvas: { scale: 2 },
			jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
		}
		window
			.html2pdf()
			.from(div)
			.set(opt)
			.save()
			.then(() => {
				this.setState({
					generatingPdf: false,
				})
			})
	}
	openImagePicker = () => {
		this.imagePicker.current.click()
	}
	render() {
		const { setOutputMode, setScanMode, scanMode, outputMode } = this.props
		const { generatingPdf } = this.state
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
					<button
						id='generate-pdf-btn'
						className='btn btn-primary'
						onClick={this.downloadPdf}>
						<i className='fas fa-download'></i>{' '}
						{generatingPdf ? 'Wait...' : 'PDF'}
					</button>
				</div>
				<br />
				<FileInput ref={this.imagePicker} />
			</div>
		)
	}
}

const mapStateToProps = ({
	option: { outputMode, scanMode },
	image: { originalImages, scannedImages },
}) => ({
	outputMode,
	scanMode,
	originalImages,
	scannedImages,
})

const mapDispatchToProps = dispatch => ({
	setOutputMode: outputFlag => dispatch(setOutputMode(outputFlag)),
	setScanMode: scanFlag => dispatch(setScanMode(scanFlag)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Controls)
