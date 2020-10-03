import { setPixelRGBA } from './Link'

export const drawSomething = (context2D: CanvasRenderingContext2D) => {
		const imageData = context2D.createImageData(480, 320)
		for (let i = 0; i < 480 * 320; i++ ) {
			setPixelRGBA(imageData, i, 0, 255, 255, 255, 255)
		}
		context2D.putImageData(imageData, 0, 0)

		context2D.fillStyle = 'lighblue'
		context2D.fillRect(0, 20, 10, 10)
		context2D.font = '48px serif'
		context2D.strokeStyle = 'red'
		context2D.fillText("48px serif fill", 0, 60)
		context2D.font = '36px sans-serif'
		context2D.strokeText("36px sans-serif; stroke", 0, 120)
}
