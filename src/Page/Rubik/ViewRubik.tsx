import React from 'react'
import { CubieView, } from './ViewCubie'
import { useRubikOrientation } from './hooks'
import { L, M, R, rubikInit, rubikReducer, U } from './rubik'
import { RubikDiv, WorldDiv } from './styles'


export const Rubik = () => {

	const { angle } = useRubikOrientation()
	const [cubieList, dispatch] = React.useReducer(rubikReducer, undefined, rubikInit)
	const cubeViews = cubieList.map((cube, index) =>
		(index === 13 ? null : <CubieView cube={cube} key={index} />))

	return (<div>
		<button onClick={() => dispatch(L(1))}>Left</button>
		<button onClick={() => dispatch(L(2))}>Left 2</button>
		<button onClick={() => dispatch(L(3))}>Left'</button>

		<button onClick={() => dispatch(M(1))}>Middle</button>
		<button onClick={() => dispatch(M(2))}>Middle 2</button>
		<button onClick={() => dispatch(M(3))}>Middle'</button>

		<button onClick={() => dispatch(R(1))}>Right</button>
		<button onClick={() => dispatch(R(2))}>Right 2</button>
		<button onClick={() => dispatch(R(3))}>Right'</button>

		<button onClick={() => dispatch(U(1))}>Up</button>
		<button onClick={() => dispatch(U(2))}>Up 2</button>
		<button onClick={() => dispatch(U(3))}>Up'</button>

		<WorldDiv>
			<RubikDiv style={{
				transform: `translateY(200px) translateZ(-250px) rotateX(${angle.x}deg) rotateY(${angle.y}deg)`
			}}>{cubeViews}</RubikDiv>
		</WorldDiv>
	</div>)
}
