import React from 'react'
import { Cube, initCubes } from './Cube'
import { useRubikOrientation } from './hooks'
import { useStyles } from './styles'


export const Rubik = () => {
	const styles = useStyles()

	const { angle } = useRubikOrientation()
	const worldTransform = `translateY(200px) translateZ(-250px) rotateX(${angle.x}deg) rotateY(${angle.y}deg)`

	return (<div className={styles.world}>
		<div className={styles.rubik} style={{
			transform: worldTransform
		}}>
			{
			initCubes.map((cube, index) => <Cube cube={cube} key={index} />)
			}
		</div>
	</div>)
}
