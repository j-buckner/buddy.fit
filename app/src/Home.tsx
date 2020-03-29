import React from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import { blue } from '@ant-design/colors';
import HealthyOptionsSrc from './assets/healthy-options.svg';
import FemaleFitnessSrc from './assets/fitness-activity-tracker.svg';
import StatsSrc from './assets/browser-stats.svg';
import MaleRunnerSrc from './assets/fitness-stats.svg';
import WorkingOutSrc from './assets/fitness-progress-tracking.svg';

const HomeContainer = styled.div`
  width: 1040px;
  margin: 0 24px 64px;
  h1 {
    margin: 24px 0;
  }
  p {
    margin: 24px 0;
    font-size: 16px;
  }
`;

const AngledTopBackground = styled.div`
  width: 100%;
  height: 1000px;
  background: linear-gradient(150deg, ${blue[6]} 15%,${blue[5]} 70%,${blue[4]} 94%);
  position: absolute;
  z-index: -1;
  -webkit-transform: skewY(-8deg);
  transform: skewY(-8deg);
  transform-origin: 0;
  top: -508px;
  left: 0;
  @media (max-width: 768px) {
    top: -420px;
  }
`;

const BottomBackground = styled.div`
  width: 100%;
  height: 100px;
  background: linear-gradient(150deg, ${blue[6]} 15%,${blue[5]} 70%,${blue[4]} 94%);
  position: absolute;
  z-index: -1;
  left: 0;
  bottom: 0;
`;

const Section = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
  &:nth-of-type(odd) {
    text-align: right;
    @media (max-width: 768px) {
      flex-direction: column-reverse;
      text-align: center;
    }
  }
  &:nth-of-type(2) {
    margin-top: 60px;
    text-align: left;
    color: #fff;
    h1 {
      color: #fff;
    }
    @media (max-width: 768px) {
      text-align: center;
    }
  }
  &:not(:nth-of-type(2)) {
    margin: 60px 0;
    color: black;
    h1 {
      color: black;
    }
    @media (max-width: 768px) {
      margin: 0 0;
    }
  }
`;

const CardText = styled.div`
  margin: 24px;
`;

const AnimatedImg = styled.img`
  max-width: 100%;
  width: 400px;
  margin: 24px;
`;

const MaleRunnerImg = styled(AnimatedImg)`
  margin: 0;
  margin-top: calc(4% + 10px);
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
`;

const StatsImg = styled(AnimatedImg)`
  margin: 0;
  width: 500px;
  transform: rotate(18deg);
`;

const Home = () => {
  return (
    <HomeContainer>
      <AngledTopBackground />
      <Section>
        <CardText>
          <h1>
            Buddy.Fit
          </h1>
          <p>
            Your buddy designed to guide you on your fitness journey.
          </p>
          <Button ghost type="default" size="large">
            Sign Up for Free
          </Button>
        </CardText>
        <MaleRunnerImg src={MaleRunnerSrc} />
      </Section>
      <Section>
        <AnimatedImg src={HealthyOptionsSrc} />
        <CardText>
          <h1>
            Lorem Ipsum
          </h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </CardText>
      </Section>
      <Section>
        <CardText>
          <h1>
            Lorem Ipsum
          </h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </CardText>
        <StatsImg src={StatsSrc} />
      </Section>
      <Section>
        <AnimatedImg src={FemaleFitnessSrc} />
        <CardText>
          <h1>
            Lorem Ipsum
          </h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </CardText>
      </Section>
      <Section>
        <CardText>
          <h1>
            Lorem Ipsum
          </h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </CardText>
        <AnimatedImg src={WorkingOutSrc} />
      </Section>
      <BottomBackground />
    </HomeContainer>
  );
}

export default Home;
