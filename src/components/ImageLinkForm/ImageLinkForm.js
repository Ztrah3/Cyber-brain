import React from 'react';
import './ImageLinkForm.css';

// ImageLinkForm component
const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div>
      {/*Displaying instructions*/}
      <p className='f3'>
        {'This Magic Brain will detect faces in your pictures. Give it a try.'}
      </p>
      <div className='center'>
        <div className='form center pa4 br3 shadow-5'>
          {/*Input field for the image URL, onInputChange is called whenever the input changes*/}
          <input className='f4 pa2 w-70 center' type='tex' onChange={onInputChange}/>
          {/*// Detect button, onButtonSubmit is called when the button is clicked*/}
          <button
            className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'
            onClick={onButtonSubmit}
          >Detect</button>
        </div>
      </div>
    </div>
  );
}

export default ImageLinkForm;