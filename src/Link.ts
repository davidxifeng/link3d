export const setPixel = (imageData: ImageData, x: number,
	y: number, r: number, g: number, b: number, a: number) => {
		const baseIndex = y * imageData.width * 4 + x * 4
		const data = imageData.data
		data[baseIndex] = r
		data[baseIndex + 1] = g
		data[baseIndex + 2] = b
		data[baseIndex + 3] = a
}

export const setPixel2 = (imageData: ImageData, x: number,
	y: number, color: number) => {
		const data = imageData.data
		const baseIndex = y * imageData.width * 4 + x * 4
		data[baseIndex] = (color & 0xff000000) >>> 24 // >> 无符号位移
		data[baseIndex + 1] = (color & 0xff0000) >> 16
		data[baseIndex + 2] = (color & 0xff00) >> 8
		data[baseIndex + 3] = color & 0xff
}