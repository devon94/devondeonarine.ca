import React from 'react';
import styled from 'styled-components';
import { startVisualizer } from '../../helpers/homepage_visualizer';
import "./styles.scss"
import Particles from './particles';

const HeaderContainer = styled.div`
  display: flex;
  position: relative;
  height: 100%;
  margin: 0px 32px;
`

const TextContainer = styled.div`
  background-color: #25262744;
  /* box-shadow: 0 0.25rem 1.5rem rgba(0,0,0,0.2); */
  display: flex;
  flex-direction: column;
  padding: 24px 56px;
  z-index: 2;
  box-sizing: content-box;
  cursor: pointer;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 8px solid #FFFFFF;
`

const Text = styled.p`
  font-family: "Proxima Nova Bold";
  position: relative;
  color: #f0f0f0;
  font-size: 64px;
  padding: 0;
  margin: 0;
  /* text-shadow: 4px 4px #582841; */
`

const Links = styled.p`
  max-width: 600px;
  font-size: 16px;
  padding: 32px 16px;
  margin-top: 0px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: space-between;
`

const Link = styled.img`
  display: flex;
  position: relative;
  height: 32px;
  width: 32px;
  margin-top: auto;
  margin-bottom: auto;
  margin: 0px 8px;

  :hover {
    opacity: 0.75;
  }
`

const Header: React.FC = () => {
  const [mount, setMount] = React.useState<boolean>(false)
  const containerRef = React.useRef<HTMLDivElement>(null)

  const onClick = () => {
    setMount(true)
    startVisualizer()
  }

  return (
    <>
      <HeaderContainer>
        <TextContainer ref={containerRef} id={"header"} onClick={onClick}>
          <Text>Devon <br />Deonarine</Text>
        </TextContainer>
        {mount ? <Particles /> : null}
      </HeaderContainer>
      <audio id={"visualizerAudio"} src={process.env.PUBLIC_URL + "music.mp3"} />
      <Links>
        <a href={"https://github.com/devon94"} target={"_blank"} rel="noopener noreferrer">
          <Link src={process.env.PUBLIC_URL + 'github.png'} />
        </a>
        <a href={"https://instagram.com/devon_94"} target={"_blank"} rel="noopener noreferrer">
          <Link src={process.env.PUBLIC_URL + 'insta.png'} />
        </a>
      </Links>
    </>
  );
}

export default Header;
