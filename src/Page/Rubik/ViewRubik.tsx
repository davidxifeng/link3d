import React from 'react'
import { CubieView, } from './ViewCubie'
import { useRubikOrientation } from './hooks'
import { R, rubikInit, rubikReducer, U } from './rubik'
import { useStyles } from './styles'


export const Rubik = () => {
	const styles = useStyles()

	const { angle } = useRubikOrientation()
	const [cubieList, dispatch] = React.useReducer(rubikReducer, undefined, rubikInit)
	const cubeViews = cubieList.map((cube, index) =>
		(index === 13 ? null : <CubieView cube={cube} key={index} />))

	return (<div>
		<button onClick={() => dispatch(R(1))}>Right</button>
		<button onClick={() => dispatch(R(2))}>Right 2</button>
		<button onClick={() => dispatch(R(3))}>Right'</button>

		<button onClick={() => dispatch(U(1))}>Up</button>
		<button onClick={() => dispatch(U(2))}>Up 2</button>
		<button onClick={() => dispatch(U(3))}>Up'</button>

		<div className={styles.world}>
			<div className={styles.rubik} style={{
				transform: `translateY(200px) translateZ(-250px) rotateX(${angle.x}deg) rotateY(${angle.y}deg)`
			}}>{cubeViews}</div>
		</div>
	</div>)
}
