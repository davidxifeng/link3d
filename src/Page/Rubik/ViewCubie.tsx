import { ViewFacelet, } from './ViewFacelet'
import { Cubie, initCubesPositions, } from './rubik'
import { CubeDiv } from './styles'


interface CubieViewProps {
  cube: Cubie
}

export const CubieView = (props: CubieViewProps) => {
  const {
    facelets,
    cubieIndex,
  } = props.cube

  const [x, y, z] = initCubesPositions[cubieIndex]
  const faceletList = Object.values(facelets).filter(v => v !== undefined)

  return (<CubeDiv style={{
    transform: `translate3d(${x * 100}px, ${y * -100}px, ${z * -100}px)`,
  }}>
    {
      faceletList.map((facelet, index) => (<ViewFacelet
        key={index}
        facelet={facelet}
        devInfo={`${cubieIndex}-${index}`}
      />))
    }
  </CubeDiv>)
}
