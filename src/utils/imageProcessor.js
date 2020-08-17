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

export { getImageUrl }
