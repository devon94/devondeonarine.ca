import Container from '@devondeonarine/components/container';
import React from 'react';
import styled from 'styled-components';
import { isMobile } from 'react-device-detect'
import { initTentacles } from '@devondeonarine/helpers/tentacles';

const Canvas = styled.canvas`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 0;
    left: 0;
`

const Logo = styled.img`
    height: 50%;
    max-height: 256px;
    max-width: 100%;
    margin: auto;
    z-index: 9999;
    object-fit: contain;
`

const TextContainerContainer = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
`

const TextContainer = styled.div`
    position: relative;
    z-index: 9999;
    margin: auto;
    width: 512px;
    height: 512px;
    top: 50%;
    transform: translateY(-52.5%);
`

const Text = styled.div`
    font-family: 'Cthulhu';
    font-size: 8px;
    color :#ffd66b;
    text-shadow: 0px 0px 20px #ffd66b;
    z-index: 9999;
    position: absolute;

    width: 512px;
    height: 512px;
    border-radius: 50%;
    font-weight: bold;
    animation: spinZ 30s linear infinite;
    text-align: center;
    transition: opacity 2.5s;
    opacity: 0;

    span {
		position: absolute;
		display: inline-block;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		text-transform: uppercase;
		font-size: 4vh;
		transition: all .5s cubic-bezier(0,0,0,1);
    }
    
    @keyframes spinZ {
		0% {
			transform: rotateZ(360deg);
		}
		100% {
			transform: rotateZ(0deg);
		}
	}
`


const LogoContainer = styled.div`
    display: flex;
    margin: auto;
    position: relative;
`

const EyeBackground = styled.div`
    position: absolute;
    width: 40%;
    height: 15%;
    border-radius: 50%;
    margin: auto;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 9998;
`

const MouthBackground = styled.div`
    position: absolute;
    width: 40%;
    height: 25%;
    border-radius: 40%;
    margin: auto;
    left: 50%;
    top: 60%;
    transform: translate(-50%, -50%);
    z-index: 9997;
`

interface Props {
}

const Cthulhu: React.FunctionComponent<Props> = (props) => {
    const [isStarted, setIsStarted] = React.useState<boolean>(false)

    const start = React.useCallback(() => {
        if (!isStarted) {
            setTimeout(() => initTentacles(), 5)
            setIsStarted(true)
        }

        if (!isMobile) {
            const element = document.getElementById("circle")!;
            setTimeout(() => element.style.opacity = '1', 30000)
        }

    }, [isStarted])

    React.useEffect(() => {
        if (!isMobile) {
            let element = document.getElementById("circle")!;
            const text = element.innerHTML;
            element.innerHTML = '';
            for (let i = 0; i < text.length; i++) {
                const letter = text[i];
                const span = document.createElement('span');
                const node = document.createTextNode(letter);
                const r = (360 / text.length) * (i);
                const num = parseInt((Math.PI / text.length).toFixed(0))
                const x = num * i
                const y = num * i
                span.appendChild(node);
                span.style.webkitTransform = 'rotateZ(' + r + 'deg) translate3d(' + x + 'px,' + y + 'px,0)';
                span.style.transform = 'rotateZ(' + r + 'deg) translate3d(' + x + 'px,' + y + 'px,0)';
                element.appendChild(span)
            }
        }
    }, [])

    const style = isStarted ? { opacity: 1 } : { opacity: 0 }

    return (
        <Container id={"container"}>
            {
                !isMobile ? <TextContainerContainer style={style}>
                    <TextContainer>
                        <Text id="circle">ph'nglui mglw'nafh Cthulhu R'lyeh wgah'nagl fhtagn</Text>
                    </TextContainer>
                </TextContainerContainer> : null
            }
            <LogoContainer id={'dm5_logo'}>
                {isStarted ? <EyeBackground id="eye_bg" /> : null}
                <Logo onClick={start} src={'/dm5.png'} />
                {isStarted ? <MouthBackground id="mouth_bg" /> : null}
            </LogoContainer>
            <audio preload={"true"} id={"visualizerAudio"} src={'/dm5_c.mp3'} />
            <Canvas id={"canvas"} />
        </Container>
    )
}

export default Cthulhu