import styled from 'styled-components/macro'

export const WorldDiv = styled.div`
  margin: auto;
  padding-top: 200px;
  width: 300px;
  height: 300px;
  perspective: 800;
`
export const RubikDiv = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
`
export const CubeDiv = styled.div`
  transform-style: preserve-3d;
`
export const FaceletDiv = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  font-size: 26px;
  user-select: none;
  background-color: rgba(0, 0, 0, 1);
  padding: 5px;
`
export const StickerDiv = styled.div`
  border-radius: 20px;
`