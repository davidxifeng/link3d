
import { makeStyles } from '@material-ui/styles'

export const useStyles = makeStyles({
	stage: {
		width: '100vw', height: '80vh', 
	},

	devInfoTip: {
 		userSelect: 'none', 
	},

	rubik: {
		margin: 'auto',
		paddingTop: '200px',
		width: 300,
		height: 300,
		perspective: 800,
	},
	world: {
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
