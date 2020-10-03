import React from 'react'
import { Cube, initCubes } from './Cube'
import { useStyles } from './styles'

const scale = 0.15
const initRotateX = -25
const initRotateY = -45

export const Rubik = () => {
	const [isMouseDown, setIsMouseDown] = React.useState(false)
	const [angleX, setAngleX] = React.useState(initRotateX)
	const [angleY, setAngleY] = React.useState(initRotateY)

	const lastX = React.useRef(0)
	const lastY = React.useRef(0)

	const handleMouseDown: React.MouseEventHandler = React.useCallback((event: React.MouseEvent<HTMLDivElement>) => {
		lastX.current = event.clientX
		lastY.current = event.clientY
		setIsMouseDown(true)
	}, [])

	const handleMouseMove: React.MouseEventHandler = React.useCallback((event: React.MouseEvent<HTMLDivElement>) => {
		const deltaX = event.clientX - lastX.current, deltaY = event.clientY - lastY.current
		setAngleX(v => v - deltaY * scale)
		setAngleY(v => v + deltaX * scale)
		lastX.current = event.clientX
		lastY.current = event.clientY
	}, [])

	const handleMouseUp: React.MouseEventHandler = React.useCallback((event: React.MouseEvent<HTMLDivElement>) => {
		setIsMouseDown(false)
	}, [])

	const styles = useStyles()
	const worldTransform = `translateY(200px) translateZ(-250px) rotateX(${angleX}deg) rotateY(${angleY}deg)`

	return (<div className={styles.stage}
		onMouseDown={handleMouseDown}
		onMouseMove={isMouseDown ? handleMouseMove : undefined}
		onMouseUp={isMouseDown ? handleMouseUp : undefined}
	>
		<p className={styles.devInfoTip}>start x is {lastX.current}, start y is: {lastY.current}</p>

		<div className={styles.rubik}>
			<div className={styles.world} style={{
				transform: worldTransform
			}}>
				{
				initCubes.map((cube, index) => <Cube cube={cube} key={index} />)
				}
			</div>
		</div>
	</div>)
}
