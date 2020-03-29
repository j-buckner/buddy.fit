import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import styled from 'styled-components';
import Navigation from '../Components/Navigation';
import Home from '../Containers/Home';
import Login from '../Containers/Login';
import SignUp from '../Containers/SignUp';
import NotFound from '../Containers/NotFound';

const AppContainer = styled.div`
  width: 100%;
  height: auto;
  position: relative;
  overflow: hidden;
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
`;

const App = () => {
  return (
    <Router>
      <AppContainer>
        <Navigation />
          <Content>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/signup">
                <SignUp />
              </Route>
              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
          </Content>
      </AppContainer>
    </Router>
  );
}

export default App;
