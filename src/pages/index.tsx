import Container from '@devondeonarine/components/container'
import Header from '@devondeonarine/components/header'
import Layout from '@devondeonarine/components/layout'
import React from 'react'
import styled from 'styled-components'

const Canvas = styled.canvas`
  background: #181818;
  position: absolute;
  height: 800px;
  top: 0px;
  width: 100%;
  z-index: 2;
  left: 50%;
  transform: translateX(-50%);
`

const InnerContainer = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`

const TopAccent = styled.div`
  background: rgb(200, 105, 105);
  position: absolute;
  height: 440px;
  top: -430px;
  width: 100%;
  z-index: 3;
  width: 200%;
  transform: rotate(-4deg) translateX(-25%);
`

const BottomGrey = styled.div`
  background: #252627;
  position: absolute;
  height: 100%;
  top: 868px;
  transform: rotate(10deg) translateX(-25%);
  width: 200%;
  z-index: 2;

  @media (min-width: 1920px) {
    top: 80%;
  }
`

const MidAccent = styled.div`
  background: rgb(50, 150, 200);
  position: absolute;
  height: 500px;
  left: 50%;
  top: 560px;
  width: 200%;
  z-index: 2;
  transform: rotate(-5deg) translateX(-25%);

  @media (min-width: 1920px) {
    top: 40%;
  }
`

const Links = styled.p`
  max-width: 600px;
  font-size: 16px;
  padding: 32px 16px;
  margin-top: 0px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  justify-content: space-between;
  z-index: 3;
`

const LinkImage = styled.img`
  display: flex;
  position: relative;
  height: 32px;
  width: 32px;
  margin-top: auto;
  margin-bottom: auto;
  margin: 0px 8px;
  object-fit: contain;
  cursor: pointer;

  :hover {
    opacity: 0.75;
  }
`

const Index: React.FunctionComponent = (props) => {
  return (
    <Layout>
      <Container>
        <InnerContainer>
          <TopAccent id={"top-accent"} />
          <Canvas id={"canvas"} />
          <MidAccent id={"mid-accent"} />
          <BottomGrey id={"bottom-accent"} />
          <Header />
          <Links>
            <a href={"https://github.com/devon94"} target={"_blank"} rel="noopener noreferrer">
              <LinkImage src={'/github.png'} />
            </a>
            <a href={"https://instagram.com/devon_94"} target={"_blank"} rel="noopener noreferrer">
              <LinkImage src={'/insta.png'} />
            </a>
          </Links>
          <audio id={"visualizerAudio"} src={"/polaris.mp3"} preload={"true"} />
        </InnerContainer>
      </Container>
    </Layout>

  )
}

export default Index