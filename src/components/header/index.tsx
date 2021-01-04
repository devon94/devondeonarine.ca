import React from 'react';
import styled from 'styled-components';
import { startVisualizer, stopVisualizer } from '@devondeonarine/helpers/homepage_visualizer';
import Particles from './particles';

interface StyledProps {
  opacity: 0 | 1
}

const HeaderContainer = styled.div`
  display: flex;
  position: relative;
  height: 100%;
  margin: 0px 32px;
`

const TextContainer = styled.div<StyledProps>`
  background-color: #25262744;
  display: flex;
  flex-direction: column;
  padding: 24px 56px;
  z-index: 2;
  box-sizing: content-box;
  cursor: pointer;
  position: absolute;
  top: 360px;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 8px solid #FFFFFF;
  transition: all 1.5s ease-in-out;
  opacity: ${props => props.opacity};

  @media only screen and (max-width: 768px) {
    padding: 16px 24px;
  }
`

const Text = styled.p`
  font-family: "Proxima Nova Bold";
  position: relative;
  color: #f0f0f0;
  font-size: 64px;
  font-weight: bold;
  padding: 0;
  margin: 0;
  line-height: 64px;
`

const LogoContainer = styled.div<StyledProps>`
  background-color: #25262744;
  display: flex;
  flex-direction: column;
  padding: 4px 16px;
  z-index: 5;
  box-sizing: content-box;
  cursor: pointer;
  position: absolute;
  top: 16px;
  left: 0px;
  border: 4px solid #FFFFFF;
  transition: all 1.5s ease-in-out;
  opacity: ${props => props.opacity};
`

const LogoText = styled.p`
  font-family: "Proxima Nova Bold";
  position: relative;
  color: #f0f0f0;
  font-size: 24px;
  font-weight: regular;
  padding: 0;
  margin: 0;
  line-height: 24px;
`

const Header: React.FC = () => {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [isStarted, setIsStarted] = React.useState<boolean>(false)
  const [logoOpacity, setLogoOpacity] = React.useState<0 | 1>(0)
  const [textOpacity, setTextOpacity] = React.useState<0 | 1>(1)

  const start = () => {
    setIsStarted(true)
    startVisualizer()
    setTextOpacity(0)
    setTimeout(() => setLogoOpacity(1), 1500)
  }

  const pause = () => {
    setIsStarted(false)
    stopVisualizer()
  }


  return (
    <>
      <HeaderContainer>
        <LogoContainer opacity={logoOpacity} ref={containerRef} id={"header"}>
          <LogoText>Devon <br />Deonarine</LogoText>
        </LogoContainer>
        <TextContainer opacity={textOpacity} ref={containerRef} id={"header"} onClick={start}>
          <Text>Devon <br />Deonarine</Text>
        </TextContainer>
        {isStarted ? <Particles /> : null}
      </HeaderContainer>
    </>
  );
}

export default Header;
