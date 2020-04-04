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
import Dashboard from '../Containers/Dashboard/Dashboard';
import NotFound from '../Containers/NotFound';

const AppContainer = styled.div`
  width: 100%;
  height: auto;
  position: relative;
  overflow: hidden;
  min-height: 100vh;
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const App = () => {
  return (
    <Router>
      <AppContainer>
        <Navigation />
          <Content>
            <Switch>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/signup">
                <SignUp />
              </Route>
              <Route path="/dashboard">
                <Dashboard />
              </Route>
              <Route exact path="/">
                <Home />
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
