import React from 'react'
import { useStyles } from './styles'

export enum FaceType {
	Front = 1,
	Back,
	Left,
	Right,
	Top,
	Bottom,
}

const FaceColors = {
	[FaceType.Front]: 'RGBA(255, 165, 0, 0.7)',
	[FaceType.Back]: 'RGB(250, 128, 114, 0.7)',
	[FaceType.Left]: 'RGB(34, 139, 34, 0.7)',
	[FaceType.Right]: 'RGB(0, 191, 255, 0.7)',
	[FaceType.Bottom]: 'RGB(255, 255, 255, 0.7)',
	[FaceType.Top]: 'RGB(255, 255, 0, 0.7)',
}


interface FaceProps {
	face: FaceType
}

export const Face = (props: FaceProps) => {
	const styles = useStyles()
	const face = props.face
	let faceTransform
	switch (face) {
		case FaceType.Front:
			faceTransform = 'translateZ(50px)'
			break
		case FaceType.Back:
			faceTransform = 'rotateY(180deg) translateZ(50px)'
			break
		case FaceType.Left:
			faceTransform = 'rotateY(-90deg) translateZ(50px)'
			break
		case FaceType.Right:
			faceTransform = 'rotateY(90deg) translateZ(50px)'
			break
		case FaceType.Bottom:
			faceTransform = 'rotateX(-90deg) translateZ(50px)'
			break
		case FaceType.Top:
			faceTransform = 'rotateX(90deg) translateZ(50px)'
			break
		default:
			faceTransform = ''
	}
	return (<div className={styles.cubeFace} style={{
		backgroundColor: FaceColors[face],
		transform: faceTransform,
	}}>
	</div>)
}
