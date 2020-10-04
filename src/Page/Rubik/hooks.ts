import React from 'react'

const scale = 0.15
const initRotateX = -25
const initRotateY = -45

export const useRubikOrientation = () => {
	const [angle, setAngle] = React.useState({x: initRotateX, y: initRotateY})
	React.useEffect(() => {
		let doUpdate = false
		let lastX = 0
		let lastY = 0

		const handleMouseDown = function (this: Window, event: MouseEvent) {
			lastX = event.clientX
			lastY = event.clientY
			doUpdate = true
		}
		const handleMouseMove = function (this:Window, event: MouseEvent) {
			if (!doUpdate) { return }
			const deltaX = event.clientX - lastX, deltaY = event.clientY - lastY
			setAngle(v => ({ x: v.x - deltaY * scale, y: v.y + deltaX * scale, }))
			lastX = event.clientX
			lastY = event.clientY
		}

		const handleMouseUp = function (this: Window, event: MouseEvent) {
			doUpdate = false
		}

		window.addEventListener('mousedown', handleMouseDown)
		window.addEventListener('mousemove', handleMouseMove)
		window.addEventListener('mouseup', handleMouseUp)

		return () => {
			window.removeEventListener('mousedown', handleMouseDown)
			window.removeEventListener('mousemove', handleMouseMove)
			window.removeEventListener('mouseup', handleMouseUp)
		}
	}, [])
	return {
		angle,
	}
}
