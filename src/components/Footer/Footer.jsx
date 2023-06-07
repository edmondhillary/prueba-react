import React from 'react';
import { FacebookOutlined, TwitterOutlined, InstagramOutlined } from '@ant-design/icons';
import './Footer.scss';

import image1 from '../../assets/store/app-store.svg';
import image2 from '../../assets/store/play-store.svg';
import image3 from '../../assets/store/windows-store.svg';

const Footer = () => {
  return (
    <footer className="footer non-sticky-footer ">
      <div className="links">
        <p href="#home">Home</p>
        <span></span>
        <p href="#terms">Terms and Condition</p>
        <span></span>
        <p href="#privacy">Privacy Policy</p>
      </div>
      <div className="social-links">
        <div style={{marginTop: '2rem'}}>
          <a style={{margin: '1rem'}} href="https://www.facebook.com"><FacebookOutlined style={{fontSize: '3rem', color: 'white', margin: '0.3rem'}}/></a>
          <a style={{margin: '1rem'}} href="https://www.twitter.com"><TwitterOutlined style={{fontSize: '3rem', color: 'white'}} /></a>
          <a style={{margin: '1rem'}} href="https://www.instagram.com"><InstagramOutlined style={{fontSize: '3rem', color: 'white'}}/></a>
        </div>
        <div>
          <img src={image1} alt="Image 1" />
          <img src={image2} alt="Image 2" />
          <img src={image3} alt="Image 3" />
        </div>
      </div>
      <p style={{textAlign: 'center', color:'darkgray'}}>© Copyright Memorandum</p>
    </footer>
  );
};

export default Footer;
