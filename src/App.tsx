import React from 'react';

import { setPixel, } from './Link'

function App() {
	const canvasRef = React.createRef<HTMLCanvasElement>()

 	React.useEffect(() => {

		const context2d = canvasRef.current?.getContext('2d')
		if (!context2d) return

		const imageData = context2d.createImageData(480, 320)
		for (let i = 0; i < 480 * 320; i++ ) {
			setPixel(imageData, i, 0, 0, 255, 0, 255)
		}
		context2d.putImageData(imageData, 0, 0)

		context2d.fillStyle = 'green'
		context2d.fillRect(0, 20, 10, 10)
		context2d.fillRect(470, 310, 10, 10)
		context2d.font = '48px serif'
		context2d.strokeStyle = 'red'
		context2d.fillText("48px serif fill", 0, 60)
		context2d.font = '36px sans-serif'
		context2d.strokeText("36px sans-serif; stroke", 0, 120)
	
 	}, [canvasRef])

 	return (
		<div style={{
			margin: 'auto',
			width: '500px',
			backgroundColor: 'black',
		}}>
			<canvas
				ref={canvasRef}
				width={480} height={320}
				style={{
					border: '1px solid black',
					padding: '1px',
				}}
			/>
		</div>
	)
}

export default App
