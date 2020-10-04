import React from 'react'
import { Facelet, FaceType } from './Facelet'
import { useStyles } from './styles'

interface Cube {
	position: [number, number, number]
	faces: FaceType[]
	index: number
}

const initCubesPositions: [number, number, number][] = [
	[0, 0, 0], [1, 0, 0], [2, 0, 0],
	[0, 1, 0], [1, 1, 0], [2, 1, 0],
	[0, 2, 0], [1, 2, 0], [2, 2, 0],
	[0, 0, 1], [1, 0, 1], [2, 0, 1],
	[0, 1, 1], [2, 1, 1],
	[0, 2, 1], [1, 2, 1], [2, 2, 1],
	[0, 0, 2], [1, 0, 2], [2, 0, 2],
	[0, 1, 2], [1, 1, 2], [2, 1, 2],
	[0, 2, 2], [1, 2, 2], [2, 2, 2],
]

const buildCubes = (value: [number, number, number], index: number): Cube => {
	const [x, y, z] = value
	const faces: FaceType[] = []
	if (x === 0) {
		faces.push(FaceType.Left)
	} else if (x === 2) {
		faces.push(FaceType.Right)
	}

	if (y === 0) {
		faces.push(FaceType.Bottom)
	} else if (y === 2) {
		faces.push(FaceType.Top)
	}

	if (z === 0) {
		faces.push(FaceType.Front)
	} else if (z === 2) {
		faces.push(FaceType.Back)
	}
	return {
		position: value,
		faces,
		index,
	}
}

export const initCubes = initCubesPositions.map(buildCubes)

interface CubeProps {
	cube: Cube
}

export const Cube = (props: CubeProps) => {
	const [x, y, z] = props.cube.position
	const faces = props.cube.faces

	const styles = useStyles()

	return (<div className={styles.cube} style={{
		transform: `translate3d(${x * 100}px, ${y * -100}px, ${z * -100}px)`,
	}}>
		{faces.map((value, index) => <Facelet face={value} key={index}></Facelet>)}
	</div>)
}
