import { FaceType } from './ViewFacelet'
import { rotate } from '../../Utility/Array'

export type RotateCount = 1 | 2 | 3
export type CubiePos = 0 | 1 | 2

// https://github.com/Microsoft/TypeScript/issues/15480
// type T = (0 .. 26)
export type CubieIndex =
	| 0  | 1  | 2  | 3  | 4  | 5  | 6  | 7  | 8
	| 9  | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17
	| 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26

export interface Facelet {
	transform: FaceType
	color: FaceType
}

export interface Cubie {
	/**
	 * cubie面
	 */
	faceletList: Facelet[]

	/**
	 * cubie的显示位置
	 */
	cubieIndex: number
}

const changedIndexByRotateX = (base: CubiePos, count: RotateCount): [CubieIndex[], CubieIndex[]] => {
	const indexList: CubieIndex[] = []
	const indexList2: CubieIndex[] = []
	indexList.push(base as CubieIndex)
	indexList.push(base + 6 as CubieIndex)
	indexList.push(base + 6 + 2 * 9 as CubieIndex)
	indexList.push(base + 2 * 9 as CubieIndex)

	indexList2.push(base + 3 as CubieIndex)
	indexList2.push(base + 6 + 9 as CubieIndex)
	indexList2.push(base + 3 + 2 * 9 as CubieIndex)
	indexList2.push(base + 9 as CubieIndex)

	const rotatedList = rotate(indexList, count)
	const rotatedList2 = rotate(indexList2, count)
	// base + 3 + 9 as CubieIndex

	return [
		indexList.concat(indexList2),
		rotatedList.concat(rotatedList2),
	]
}



const rotateRight = (cubieList: CubieList, count: RotateCount): CubieList => {
	const newCubieList = cubieList.map(v => ({
		cubieIndex: v.cubieIndex,
		faceletList: [...v.faceletList],
	}))
	const [indexList, rotatedIndexList] = changedIndexByRotateX(2, count)
	for (let i = 0; i < indexList.length; i++) {
		const newIndex = rotatedIndexList[i]
		const oldIndex = indexList[i]
		console.log(newCubieList[newIndex])
		console.log(cubieList[oldIndex])
		//newCubieList[newIndex].cubieIndex = cubieList[oldIndex].cubieIndex
	}

	return newCubieList
}

export const rubikInit = (): CubieList => {
	return initCubesPositions.map(buildInitCube)
}

export const initCubesPositions: [CubiePos, CubiePos, CubiePos][] = [
	[0, 0, 0], [1, 0, 0], [2, 0, 0],
	[0, 1, 0], [1, 1, 0], [2, 1, 0],
	[0, 2, 0], [1, 2, 0], [2, 2, 0],
	[0, 0, 1], [1, 0, 1], [2, 0, 1],
	[0, 1, 1], [1, 1, 1], [2, 1, 1],
	[0, 2, 1], [1, 2, 1], [2, 2, 1],
	[0, 0, 2], [1, 0, 2], [2, 0, 2],
	[0, 1, 2], [1, 1, 2], [2, 1, 2],
	[0, 2, 2], [1, 2, 2], [2, 2, 2],
]

const initFacelet = (type: FaceType): Facelet => {
	return {
		transform: type,
		color: type,
	}
}

const buildInitCube = (value: [CubiePos, CubiePos, CubiePos], index: number): Cubie => {
	const [x, y, z] = value
	const faces: Facelet[] = []
	if (x === 0) { faces.push(initFacelet(FaceType.Left))
	} else if (x === 2) { faces.push(initFacelet(FaceType.Right))
	}

	if (y === 0) { faces.push(initFacelet(FaceType.Bottom))
	} else if (y === 2) { faces.push(initFacelet(FaceType.Top))
	}

	if (z === 0) { faces.push(initFacelet(FaceType.Front))
	} else if (z === 2) { faces.push(initFacelet(FaceType.Back))
	}
	return { faceletList: faces, cubieIndex: index, }
}

export type CubieList = Cubie[]

export type CubeAction =
	| ReturnType<typeof R>
	| ReturnType<typeof U>

export const R = (count: RotateCount) => ({ type: 'rotate_right', count, } as const)
export const U = (count: RotateCount) => ({ type: 'rotate_up', count, } as const)

export const rubikReducer = (cubes: CubieList, action: CubeAction): CubieList => {
	switch(action.type)	{
		case 'rotate_right': return rotateRight(cubes, action.count)
		case 'rotate_up': return rotateUp(cubes, action.count)
		default: return cubes
	}
}

const rotateUp = (cubes: CubieList, count: RotateCount) => {
	return cubes
}
