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
		<canvas width={480} height={320}
			ref={canvasRef} className={styles.canvas}
		/>
	</div>)
}
