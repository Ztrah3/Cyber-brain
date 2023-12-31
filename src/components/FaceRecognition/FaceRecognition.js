import React from 'react';
import './FaceRecognition.css';

// FaceRecognition component
const FaceRecognition = ({ imageUrl, box }) => {
  return (
    <div className='center ma'>
      <div className='absolute mt2'>
        {/* Displaying the image */}
        <img id='inputimage' alt='' src={imageUrl} width='500px' heigh='auto'/>
        {/* // Displaying the bounding box around the face */}
        <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
      </div>
    </div>
  );
}

export default FaceRecognition;