import React from 'react';
import Tilt from 'react-parallax-tilt';
import brain from './brain.png';
import './Logo.css';

// Logo component
const Logo = () => {
  return (
    <div className='ma4 mt0'>
      {/*Tilt component for the parallax effect*/}
      <Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 250, width: 250 }} >
        <div className="Tilt-inner pa3">
          {/*Displaying the logo image*/}
          <img style={{paddingTop: '30px', height: 150, width: 150 }} alt='logo' src={brain}/>
        </div>
      </Tilt>
    </div>
  );
}

export default Logo;