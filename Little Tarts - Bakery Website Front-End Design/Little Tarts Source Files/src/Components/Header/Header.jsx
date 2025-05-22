// Header.jsx
import React, { useEffect } from 'react';
import gsap from 'gsap';
import styled from 'styled-components';
import './Header.css';

const Header = () => {
  useEffect(() => {
    const t1 = gsap.timeline();
    t1.from('.header div', {
      y: '200%',
      ease: 'power4.out',
      delay: 0.5,
      duration: 1.6,
      stagger: {
        amount: 0.5,
      },
    });
  }, []);

  return (
    <HeaderContainer className='header-div'>
      <Line className="header">
        <Text className="header-text">
          Ever-Lasting-
        </Text>
      </Line>
      <Line className="header">
        <Text className="header-text">
          Taste
        </Text>
      </Line>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Line = styled.div`
  width: 77%;
  height: 12.5vw;
  position: relative;
  overflow: hidden;

  &:nth-of-type(1) {
    display: flex;
    justify-content: flex-end;
    margin-bottom: -3.5vw;
  }
  &:nth-of-type(2) {
    display: flex;
    justify-content: center;
  }
`;

const Text = styled.div`
  position: absolute;
  font-size: 6.5vw;
  color: rgb(255, 123, 198);
  line-height: 12.5vw;
`;
