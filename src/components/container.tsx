import styled from "styled-components"

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  background: #181818;
  background-color: #181818;
`

interface Props {
  id?: string
}

const Container: React.FunctionComponent<Props> = (props) => {
  return <MainContainer id={props.id}>{props.children}</MainContainer>
}

export default Container
