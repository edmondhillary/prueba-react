import React from 'react';
import './Header.scss';

import { Button as AntdButton } from 'antd';
import Button from '../Button/Button';
import { Link } from 'react-router-dom';

const Header = ({text}) => {
  return (
    <div className="header">
      <div className="top">
      <h2><Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>DEMO Streaming</Link></h2>
        <div>
          <AntdButton type="secondary">Login</AntdButton>
          <Button>Start your free trial</Button>
        </div>
      </div>
      <div className="bottom">
        <h2 style={{color: 'white', margin:'1rem'}}>{text}</h2> 
      </div>
    </div>
  );
};

export default Header;
