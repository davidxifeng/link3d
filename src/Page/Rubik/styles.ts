
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

	facelet: {
		position: 'absolute',
		width: '100px',
		height: '100px',
		textAlign: 'center',
		lineHeight: '100px',
		fontSize: '26px',
		userSelect: 'none',
		//backgroundColor: 'RGBA(0, 0, 0, 0.7)',
		backgroundColor: 'RGBA(0, 0, 0, 1)',
		padding: '5px',
	},
	sticker: {
		borderRadius: '20px',
	},
})
