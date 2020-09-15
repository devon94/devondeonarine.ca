import React from 'react';
import { Route, Router } from "react-router-dom";
import styled, { ThemeProvider } from 'styled-components';
import Home from './containers/home';
import { createBrowserHistory } from 'history';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`

const TopBlack = styled.div`
  background: #181818;
  /* background: #252627; */
  position: absolute;
  height: 768px;
  top: -192px;
  transform: rotate(-5deg) translateX(-25%);
  width: 200%;
  z-index: -2;
`

const TopAccent = styled.div`
  background: rgb(200, 105, 105);
  position: absolute;
  height: 440px;
  top: -430px;
  width: 100%;
  z-index: 1;
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
  z-index: -2;

  @media (min-width: 1920px) {
    top: 80%;
  }
`

const MidAccent = styled.div`
  background: rgb(50, 150, 200);
  position: absolute;
  height: 500px;
  right: 0;
  top: 560px;
  width: 100%;
  z-index: -3;

  @media (min-width: 1920px) {
    top: 40%;
  }
`
export const history = createBrowserHistory();

const theme = {
  text: "#FFFFFF",
  accent: "#d9adad",
};



const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <TopAccent id={"top-accent"} />
        <TopBlack />
        <MidAccent id={"mid-accent"} />
        <BottomGrey id={"bottom-accent"} />
        <Router history={history} >
          <Route path="/" exact component={Home} />
        </Router>
      </Container>
    </ThemeProvider>
  );
}

export default App;
