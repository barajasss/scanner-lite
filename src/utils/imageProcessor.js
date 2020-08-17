const getImageUrl = file => {
	return new Promise((resolve, reject) => {
		const fileReader = new FileReader()
		fileReader.readAsDataURL(file)
		fileReader.onload = function () {
			resolve(fileReader.result)
		}
		fileReader.onerror = err => reject('Error in file processing', err)
	})
}

const getScannedImageUrl = (canvas, url, contrast = 100, lightness = 80) => {
	return new Promise((resolve, reject) => {
		const img = document.createElement('img')
		img.src = url
		img.style.display = 'none'
		document.body.appendChild(img)
		img.onload = function () {
			canvas.width = img.naturalWidth
			canvas.height = img.naturalHeight
			const ctx = canvas.getContext('2d')
			ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
			// setTimeout(() => {
			const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
			const d = imgData.data
			contrast = contrast / 100 + 1 //convert to decimal & shift range: [0..2]
			const intercept = 128 * (1 - contrast)
			for (let i = 0; i < d.length; i += 4) {
				//r,g,b,a
				d[i] = d[i] * contrast + intercept
				d[i + 1] = d[i + 1] * contrast + intercept
				d[i + 2] = d[i + 2] * contrast + intercept

				// lightness
				let lightness = parseInt((d[i] + d[i + 1] + d[i + 2]) / 3)

				d[i] = lightness
				d[i + 1] = lightness
				d[i + 2] = lightness
			}
			ctx.putImageData(imgData, 0, 0)
			document.body.removeChild(img)
			resolve(canvas.toDataURL('img/jpg'))
			// }, 0)
		}
	})
}

export { getImageUrl, getScannedImageUrl }
