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

export interface Facelets {
	front?: Facelet
	back?: Facelet
	left?: Facelet
	right?: Facelet
	top?: Facelet
	bottom?: Facelet
}

export interface Cubie {
	/**
	 * cubie面
	 */
	facelets: Facelets

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



const rotateFaceletsX = (facelets: Facelets, count: RotateCount = 1): Facelets => {
	if (count === 1) {
		return {
			front: facelets.bottom && { transform: FaceType.Front, color: facelets.bottom.color},
			top: facelets.front && { transform: FaceType.Top, color: facelets.front.color},
			back: facelets.top && { transform: FaceType.Back, color: facelets.top.color},
			bottom: facelets.back && { transform: FaceType.Bottom, color: facelets.back.color},
			left: facelets.left && { transform: FaceType.Left, color: facelets.left.color},
			right: facelets.right && { transform: FaceType.Right, color: facelets.right.color},
		}
	} else if (count === 2) {
		return {
			front: facelets.back && { transform: FaceType.Front, color: facelets.back.color},
			top: facelets.bottom && { transform: FaceType.Top, color: facelets.bottom.color},
			back: facelets.front && { transform: FaceType.Back, color: facelets.front.color},
			bottom: facelets.top && { transform: FaceType.Bottom, color: facelets.top.color},
			left: facelets.left && { transform: FaceType.Left, color: facelets.left.color},
			right: facelets.right && { transform: FaceType.Right, color: facelets.right.color},
		}
	} else {
		return {
			front: facelets.top && { transform: FaceType.Front, color: facelets.top.color},
			top: facelets.back && { transform: FaceType.Top, color: facelets.back.color},
			back: facelets.bottom && { transform: FaceType.Back, color: facelets.bottom.color},
			bottom: facelets.front && { transform: FaceType.Bottom, color: facelets.front.color},
			left: facelets.left && { transform: FaceType.Left, color: facelets.left.color},
			right: facelets.right && { transform: FaceType.Right, color: facelets.right.color},
		}
	}
}


const rotateX = (cubieList: CubieList, pos: CubiePos, count: RotateCount): CubieList => {
	const newCubieList: CubieList = cubieList.map(v => ({ cubieIndex: v.cubieIndex, facelets: v.facelets, }))

	const [indexList, rotatedIndexList] = changedIndexByRotateX(pos, count)
	for (let i = 0; i < indexList.length; i++) {
		const newIndex = indexList[i]
		const oldIndex = rotatedIndexList[i]
		newCubieList[newIndex].facelets = rotateFaceletsX(cubieList[oldIndex].facelets, count)
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
	const facelets: Facelets = {}
	if (x === 0) {
		facelets.left = initFacelet(FaceType.Left)
	} else if (x === 2) {
		facelets.right = initFacelet(FaceType.Right)
	}

	if (y === 0) {
		facelets.bottom = initFacelet(FaceType.Bottom)
	} else if (y === 2) {
		facelets.top = initFacelet(FaceType.Top)
	}

	if (z === 0) {
		facelets.front = initFacelet(FaceType.Front)
	} else if (z === 2) {
		facelets.back = initFacelet(FaceType.Back)
	}
	return { facelets: facelets, cubieIndex: index, }
}

export type CubieList = Cubie[]

export type CubeAction =
	| ReturnType<typeof R>
	| ReturnType<typeof L>
	| ReturnType<typeof M>
	| ReturnType<typeof U>
	| ReturnType<typeof M_Y>
	| ReturnType<typeof D>
	| ReturnType<typeof F>
	| ReturnType<typeof B>
	| ReturnType<typeof M_Z>

export const R = (count: RotateCount) => ({ type: 'rotate_right', count, } as const)
export const M = (count: RotateCount) => ({ type: 'rotate_middle', count, } as const)
export const L = (count: RotateCount) => ({ type: 'rotate_left', count, } as const)

export const D = (count: RotateCount) => ({ type: 'rotate_down', count, } as const)
export const M_Y = (count: RotateCount) => ({ type: 'rotate-middle-y', count, } as const)
export const U = (count: RotateCount) => ({ type: 'rotate_up', count, } as const)

export const F = (count: RotateCount) => ({ type: 'rotate-front', count, } as const)
export const B = (count: RotateCount) => ({ type: 'rotate-back', count, } as const)
export const M_Z = (count: RotateCount) => ({ type: 'rotate-middle-z', count, } as const)

export const rubikReducer = (cubes: CubieList, action: CubeAction): CubieList => {
	switch(action.type)	{
		case 'rotate_left': return rotateX(cubes, 0, action.count)
		case 'rotate_middle': return rotateX(cubes, 1, action.count)
		case 'rotate_right': return rotateX(cubes, 2, action.count)

		case 'rotate_down': return rotateY(cubes, 0, action.count)
		case 'rotate-middle-y': return rotateY(cubes, 1, action.count)
		case 'rotate_up': return rotateY(cubes, 2, action.count)

		case 'rotate-front': return rotateZ(cubes, 0, action.count)
		case 'rotate-middle-z': return rotateZ(cubes, 1, action.count)
		case 'rotate-back': return rotateZ(cubes, 2, action.count)

		default: return cubes
	}
}

const rotateY = (cubes: CubieList, pos: CubiePos, count: RotateCount) => {
	return cubes
}

const rotateZ = (cubes: CubieList, pos: CubiePos, count: RotateCount) => {
	return cubes
}
