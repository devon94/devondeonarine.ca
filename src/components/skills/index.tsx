import React from 'react';
import styled, { keyframes } from 'styled-components';
import Skill from './skill';


const SkillsContainer = styled.div`
  max-width: 600px;
  width: 100%;
  display: flex;
  margin-top: 58px;
  margin-left: auto;
  margin-right: auto;
  flex-direction: column;
  /* border: 8px solid ${props => props.theme.accent}; */
  padding: 64px 0px;
;

`
const Header = styled.p`
  text-decoration: underline;
  margin-bottom: 16px;
  padding-left: 16px;
  padding-right: 16px;
  font-weight: 300;
  font-size: 24px;
`


const Skills: React.FC = () => {
  return (
    <SkillsContainer>
      <Header>Things I know</Header>
      <Skill name={"TypeScript"} width={80} />
      <Skill name={"React"} subtext={"Redux, Redux-Saga, Immutable.js, HTML/CSS"} width={85} />
      <Skill name={"React Native"} subtext={"Redux, Redux-Saga, Immutable.js, Fastlane, CodePush"} width={75} />
      <Skill name={"JavaScript"} width={90} />
      <Skill name={"C#"} subtext={".NET Core & Framework, Entity Framework 6 & Core, Azure Service Bus, SignalR"} width={65} />
      <Skill name={"SQL"}  subtext={"Microsoft SQL Server"} width={65} />
      <Skill name={"Other"}  subtext={"Octopus Deploy, Team City, BitBucket"} width={65} />
    </SkillsContainer>
  );
}

export default Skills;
