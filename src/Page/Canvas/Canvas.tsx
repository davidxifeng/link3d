import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { drawSomething } from './Draw'
import tw from 'tailwind-styled-components'

const useStyles = makeStyles({
	container: {
		margin: 'auto',
		width: '480px',
	},
	canvas: {
	},
})

const TailWindDemo = tw.div`
bg-blue-100
p-1
`

export const CanvasPlayground = () => {
	const canvasRef = React.useRef<HTMLCanvasElement>(null)
	const styles = useStyles()

	React.useEffect(() => {
		const context2d = canvasRef.current?.getContext('2d')
		if (context2d != null) {
			drawSomething(context2d)
		}
	}, [canvasRef])

	return (<div className={styles.container}>
		<TailWindDemo>Hello world</TailWindDemo>
		<div className="p-2 flex bg-yellow-100 justify-items-center justify-center">
			<div className="bg-red-300 p-2">
				left box
			</div>
			<div className="bg-blue-300 p-2">right box</div>
		</div>
		<canvas width={480} height={320}
			ref={canvasRef} className={styles.canvas}
		/>
	</div>)
}
