import React from 'react';
import styled, { keyframes } from 'styled-components';

interface SkillProps {
  width: number
}

const getSkillAnimation = (width: number) => keyframes`
    from {
        width: 0%;
    }
    to {
      width: ${width}%;
    }
`

const SkillBar = styled.div`
  margin-left: 0px;
  margin-right: auto;
  width: 100%;
  position: relative;
  display: flex;

:after {
  content: "";
  width: 100%;
  height: 16px;
  background: #181818;
  display: block;
}

:before {
  content: "";
  height: 16px;
  background: #Fdd75f;
  position: absolute;
  top: 0px;
  left: 0px;
  width: ${(props: SkillProps) => props.width}%;
  animation: ${(props: SkillProps) => getSkillAnimation(props.width)}  1.5s ease-in-out;
}
`

const SkillContainer = styled.div`
  padding-left: 16px;
  padding-right: 16px;
`

const TextContainer = styled.div`
  display: flex;
  margin-top: 8px;
  margin-bottom: 8px;
`

const MainText = styled.p`
  margin: 0;
  color: #F0F0F0;
`

const SubText = styled.p`
  font-size: 12px;
  opacity: 0.6;
  margin-top: auto;
  margin-left: 6px;
  margin-bottom: 2px;
`

interface Props {
  name: string
  width: number
  subtext?: string
}

const Skill: React.FC<Props> = (props) => {
  return (
    <SkillContainer>
      <TextContainer>
        <MainText>{props.name}</MainText>
        {props.subtext ? <SubText>({props.subtext})</SubText> : null}
        </TextContainer>
    </SkillContainer>
  )
}

export default Skill