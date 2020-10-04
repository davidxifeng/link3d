import React from 'react'
import { Facelet } from './rubik'
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

const FaceTransform = {
	[FaceType.Front]: 'translateZ(50px)',
	[FaceType.Back]: 'rotateY(180deg) translateZ(50px)',
	[FaceType.Left]: 'rotateY(-90deg) translateZ(50px)',
	[FaceType.Right]: 'rotateY(90deg) translateZ(50px)',
	[FaceType.Bottom]: 'rotateX(-90deg) translateZ(50px)',
	[FaceType.Top]: 'rotateX(90deg) translateZ(50px)',
}

interface ViewFaceletProps {
	facelet: Facelet
	devInfo: string
}
export const ViewFacelet = (props: ViewFaceletProps) => {
	const {
		facelet: {transform, color},
		devInfo,
	 } = props

	const styles = useStyles()

	return (<div className={styles.facelet} style={{
		transform: FaceTransform[transform],
	}}>
		<div className={styles.sticker} style={{
			backgroundColor: FaceColors[color],
		}}>
			{devInfo}
		</div>
	</div>)
}
