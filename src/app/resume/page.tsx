"use client"

import { Download, Github, Mail, Phone } from "lucide-react"
import React from "react"
import styled, { createGlobalStyle } from "styled-components"

const baseText = `
  color: #353535;
  font-family: "Tiempo", serif;
  font-weight: 400;
`

const Main = styled.div`
  display: flex;
  height: 100vh;
  overflow: auto;
  background-color: #f0f0f0;
  position: relative;

  @media print {
    display: block;
    height: auto;
    overflow: visible;
    background-color: #ffffff;
  }
`

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #f0f0f0;

    @media print {
      background-color: #ffffff;
    }
  }
`

const Container = styled.div`
  ${baseText}
  max-width: 768px;
  padding: 16px 48px;
  margin: 16px auto;
  border-radius: 4px;
  font-size: 12px;
`

// Header Components
const Header = styled.header`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
`

const HeaderContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const FullName = styled.div`
  color: #a37c82;
  font-size: 24px;
  margin-right: auto;
  font-weight: 400;
`

const ContactInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const ContactItem = styled.div`
  display: flex;
  align-items: center;

  a {
    text-decoration: none;
    color: #a37c82;
  }
`

const Icon = styled.i`
  margin-right: 4px;
`

const Separator = styled.span`
  margin: 0 8px;
`

// Section Components
const Section = styled.section`
  margin-top: 16px;
  
  &:last-of-type {
    margin-bottom: 0;
  }
`

const SectionTitle = styled.h2`
  ${baseText}
  font-size: 12px;
  text-transform: uppercase;
  margin: 0;
`

const Divider = styled.hr`
  opacity: 0.25;
  margin: 4px 0;
  height: 1px;
  width: 100%;
  background-color: #353535;
  border: none;
`

// Skills Components
const SkillsList = styled.div`
  margin-top: 8px;
  display: flex;
  flex-direction: column;
`

const SkillItem = styled.div`
  margin-bottom: 4px;
  line-height: 20px;
  
  span {
    opacity: 0.75;
  }
`

const SkillName = styled.b`
  font-weight: 500;
`

// Experience Components
const ExperienceList = styled.div``

const ExperienceItem = styled.div`
  margin: 8px 0;
  
  &:last-of-type {
    margin-bottom: 0;
  }
`

const ExperienceHeader = styled.div`
  display: flex;
  align-items: center;
`

const CompanyLogo = styled.img`
  width: 36px;
  height: 36px;
  object-fit: contain;
  margin-right: 16px;
`

const ExperienceDetails = styled.div`
  width: 100%;
`

const ExperienceTitle = styled.div`
  align-items: center;
`

const Position = styled.span`
  font-weight: 500;
`

const TechStack = styled.span`
  margin-left: 8px;
  opacity: 0.75;
`

const Duration = styled.div`
  margin-left: auto;
  font-size: 12px;
  opacity: 0.75;
`

const CompanyInfo = styled.div`
  font-size: 12px;
  opacity: 0.75;
`

const Description = styled.div`
  margin-top: 8px;
  
  ul {
    margin-top: 0;
  }
  
  li {
    margin: 4px 0 4px 24px;
    list-style: disc;
    line-height: 20px;
  }
`

const DownloadButton = styled.button`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #00000011;
  display: flex;
  border: none;
  position: fixed;
  bottom: 16px;
  right: 32px;
  justify-content: center;
  align-items: center;

  backdrop-filter: blur(40px);
  @media print {
    display: none;
  }
`

interface ExperienceItemData {
  logo: string
  position: string
  techStack?: string
  duration: string
  company: string
  location: string
  description?: string[]
}

const experienceData: ExperienceItemData[] = [
  {
    logo: "/archon-logo.png",
    position: "Principal Software Developer",
    techStack: "(Typescript, React, React Native, Next.js, Expo, C#, .NET, Azure)",
    duration: "May 2017 - Present",
    company: "Archon Systems Inc.",
    location: "Toronto, Ontario",
    description: [
      "Led the modernization of our frontend technologies and development processes - introduced TypeScript company-wide, introduced Playwright and improved end-to-end testing, addressed technical debt, and migrated several single-page applications to Next.js",
      "Directed our React Native project throughout its lifecycle, from proof of concept to production-ready application. Defined best practices, provided technical guidance, implemented native modules for our custom hardware, migrated to expo, and continuously worked on improving the product",
      "Led many projects from start to finish - researched technical solutions, worked with UX, Support, Product and other developers to plan timelines, and balanced business priorities with technical constraints to deliver results",
      "Assisted in architechting and developing a scalable label generation and cloud printing system, including a cross-platform desktop application, frontend label designer, and backend infrastructure",
      "Worked closely with DevOps to create and maintain CI/CD pipelines for many web and mobile projects, dockerizing builds and integrating sentry to streamline the development and iteration process",
      "Continuously shared knowledge and best practices with the development team through code reviews, pair programming, technical discussions, and mentoring",
      "Actively participated in hiring rounds and played a key role in onboarding new team members, collaborating with HR and management to provide a supportive and smooth experience for incoming talent"
    ]
  },
  {
    logo: "/pp3.png",
    position: "Software Developer (Consultant)",
    techStack: "(React, C#/.NET, Azure, AWS, Typescript, NextJS)",
    duration: "Dec. 2021 - Sept. 2023",
    company: "ProductPinion Inc.",
    location: "Toronto, Ontario",
    description: [
      "Worked with founders to plan and build the company's first product - helped choose technologies, set up initial architecture, and led the development team through ongoing improvements",
      "Assisted in the design of UI/UX enhancements and drove ongoing implementations, leveraging technologies such as React, Next.js, and TypeScript to create a modern, responsive, and user-friendly web application",
      "Architected and developed a scalable Event-Driven microservice using Microsoft Orleans, which serves as a critical component of the product architecture, handling core business logic and AI summarization features",
      "Created and maintained CI/CD pipelines for frontend projects using GitHub Actions and Docker, implementing comprehensive testing and build checks to ensure code quality and reliability. This resulted in a more streamlined and faster deployment cycles"
    ]
  }
]

const educationData: ExperienceItemData[] = [
  {
    logo: "/tmu.png",
    position: "B.Sc. Computer Science",
    duration: "2012 - 2017",
    company: "Toronto Metropolitan University",
    location: "(FKA Ryerson University)"
  }
]

export default function ResumePage() {
  const onClickDownload = () => {
    window.open("/Devon Deonarine.pdf")
  }

  return (
    <Main>
      <Container>
        <GlobalStyle />
        <Header>
          <HeaderContent>
            <FullName>
              <span>Devon</span>
              <span style={{ marginLeft: '8px' }}>Deonarine</span>
            </FullName>
            <ContactInfo>
              <ContactItem>
                <Phone className="w-3 h-3 text-[#353535] mr-1" />
                <a href="tel:4167951771">(416) 795-1771</a>
              </ContactItem>
              <Separator>|</Separator>
              <ContactItem>
                <Mail className="w-3 h-3 text-[#353535] mr-1" />
                <a href="mailto:hello@devondeonarine.ca">hello@devondeonarine.ca</a>
              </ContactItem>
              <Separator>|</Separator>
              <ContactItem>
                <Github className="w-3 h-3 text-[#353535] mr-1" />
                <a href="https://github.com/devon94">devon94</a>
              </ContactItem>
            </ContactInfo>
          </HeaderContent>
        </Header>

        <Section>
          <SectionTitle>Skills</SectionTitle>
          <Divider />
          <SkillsList>
            <SkillItem>
              <SkillName>Languages:&nbsp;</SkillName>
              <span>TypeScript, C#, JavaScript, SQL, Rust, HTML, CSS</span>
            </SkillItem>
            <SkillItem>
              <SkillName>Front End Frameworks & Libraries:&nbsp;</SkillName>
              <span>React, React Native, Expo, Next.js, Redux, Redux-Saga, Mocha, Playwright, Jest, Styled Components</span>
            </SkillItem>
            <SkillItem>
              <SkillName>Back End Frameworks & Libraries:&nbsp;</SkillName>
              <span>Node.js, .NET 6+, Orleans, Entity Framework (6/Core), Identity Server, SignalR</span>
            </SkillItem>
            <SkillItem>
              <SkillName>DevOps & Cloud Services:&nbsp;</SkillName>
              <span>Azure, Docker, AWS, Auth0, Microsoft SQL Server, Octopus Deploy</span>
            </SkillItem>
          </SkillsList>
        </Section>

        <Section>
          <SectionTitle>Experience</SectionTitle>
          <Divider />
          <ExperienceList>
            {experienceData.map((experience, index) => (
              <ExperienceItem key={index} style={index > 0 ? { marginTop: 16 } : undefined}>
                <ExperienceHeader>
                  <CompanyLogo src={experience.logo} alt={`${experience.company} Logo`} />
                  <ExperienceDetails>
                    <ExperienceTitle>
                      <Position>{experience.position}</Position>
                      {experience.techStack && <TechStack>{experience.techStack}</TechStack>}
                      <Duration>{experience.duration}</Duration>
                    </ExperienceTitle>
                    <CompanyInfo>{experience.company} | {experience.location}</CompanyInfo>
                  </ExperienceDetails>
                </ExperienceHeader>
                {experience.description && (
                  <Description>
                    <ul>
                      {experience.description.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </Description>
                )}
              </ExperienceItem>
            ))}
          </ExperienceList>
        </Section>

        <Section>
          <SectionTitle>Education</SectionTitle>
          <Divider />
          <ExperienceList className="pb-8">
            {educationData.map((education, index) => (
              <ExperienceItem key={index}>
                <ExperienceHeader>
                  <CompanyLogo src={education.logo} alt={`${education.company} Logo`} />
                  <ExperienceDetails>
                    <ExperienceTitle>
                      <Position>{education.position}</Position>
                      <Duration>{education.duration}</Duration>
                    </ExperienceTitle>
                    <CompanyInfo>{education.company} {education.location}</CompanyInfo>
                  </ExperienceDetails>
                </ExperienceHeader>
              </ExperienceItem>
            ))}
          </ExperienceList>
        </Section>
      </Container>
      <DownloadButton onClick={onClickDownload}>
        <Download className="text-black" />
      </DownloadButton>
    </Main>
  )
}