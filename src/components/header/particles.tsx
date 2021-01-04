import React from 'react';
import styled from 'styled-components';


const ParticleWrapper = styled.div`
    position: absolute;
    z-index: 2;
    top: 400px;
    left: 50%;
    transform: translateX(-50%);
`

const p = [...new Array(500)].map((_, index) => <div key={index} className='c' />)

interface Props {
    onClick?: VoidFunction
}


const Particles: React.FunctionComponent<Props> = (props) => {
    return (
        <ParticleWrapper id={"particleWrapper"}>
            <div className='wrap' onClick={props.onClick}>
                {p}
            </div>
        </ParticleWrapper>
    )

}

export default Particles