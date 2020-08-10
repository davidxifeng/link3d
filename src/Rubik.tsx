import React from 'react'

const cubeFaceStyle: React.CSSProperties = {
  position: 'absolute',
  width: '100px',
  height: '100px',
  textAlign: 'center',
  lineHeight: '100px',
  fontSize: '26px',
  color: 'rgb(255,255,255)',
  userSelect: 'none',
  borderRadius: '10px',
}
const scale = 0.15

enum FaceType {
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

const Face = (props: FaceProps) => {
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
  return (<div style={{
    ...cubeFaceStyle,
    backgroundColor: FaceColors[face],
    transform: faceTransform,
  }}>
  </div>)
}

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

const initCubes = initCubesPositions.map(buildCubes)

interface CubeProps {
  cube: Cube
}

const Cube = (props: CubeProps) => {
  const [x, y, z] = props.cube.position
  const faces = props.cube.faces

  return (<div style={{
    transformStyle: 'preserve-3d',
    transform: `translate3d(${x * 100}px, ${y * -100}px, ${z * -100}px)`,
  }}>
    {faces.map((value, index) => <Face face={value} key={index}></Face>)}
  </div>)
}

const initRotateX = -25
const initRotateY = -45

export const Rubik = () => {
  const [isMouseDown, setIsMouseDown] = React.useState(false)
  const [angleX, setAngleX] = React.useState(initRotateX)
  const [angleY, setAngleY] = React.useState(initRotateY)

  const lastX = React.useRef(0)
  const lastY = React.useRef(0)
  const [cubes/*, setCubes*/] = React.useState(initCubes)

  const handleMouseDown: React.MouseEventHandler = React.useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    lastX.current = event.clientX
    lastY.current = event.clientY
    setIsMouseDown(true)
  }, [])

  const handleMouseMove: React.MouseEventHandler = React.useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    const deltaX = event.clientX - lastX.current, deltaY = event.clientY - lastY.current
    setAngleX(v => v - deltaY * scale)
    setAngleY(v => v + deltaX * scale)
    lastX.current = event.clientX
    lastY.current = event.clientY
  }, [])

  const handleMouseUp: React.MouseEventHandler = React.useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    setIsMouseDown(false)
  }, [])

  React.useEffect(() => {
  }, [])

  const sceneTransform = `translateY(200px) translateZ(-250px) rotateX(${angleX}deg) rotateY(${angleY}deg)`

  return (<div
    style={{ width: '100vw', height: '100vh', }}
    onMouseDown={handleMouseDown}
    onMouseMove={isMouseDown ? handleMouseMove : undefined}
    onMouseUp={isMouseDown ? handleMouseUp : undefined}
  >
    <p style={{ userSelect: 'none', }}>start x is {lastX.current}, start y is: {lastY.current}</p>

    <div style={{
      margin: 'auto', paddingTop: '200px', width: 300, height: 300,
      perspective: 800,
    }}>
      <div style={{
        position: 'relative', width: '100%', height: '100%',
        transformStyle: 'preserve-3d',
        transform: sceneTransform,
      }}> {cubes.map((cube, index) => <Cube cube={cube} key={index} />)}
      </div>
    </div>
  </div>)
}