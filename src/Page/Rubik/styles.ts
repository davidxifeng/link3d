
import { makeStyles } from '@material-ui/styles'

export const useStyles = makeStyles({
	world: {
		margin: 'auto',
		paddingTop: '200px',
		width: 300,
		height: 300,
		perspective: 800,
	},
	rubik: {
		position: 'relative', width: '100%', height: '100%',
		transformStyle: 'preserve-3d',
	},
	cube: {
		transformStyle: 'preserve-3d',
	},

	cubeFace: {
		position: 'absolute',
		width: '100px',
		height: '100px',
		textAlign: 'center',
		lineHeight: '100px',
		fontSize: '26px',
		color: 'rgb(255,255,255)',
		userSelect: 'none',
		borderRadius: '10px',
	},
})
