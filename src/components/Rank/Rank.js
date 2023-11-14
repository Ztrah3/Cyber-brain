import React from 'react';

// Rank component
const Rank = ({ name, entries }) => {
  return (
    <div>
      {/*Displaying a message with the user's name*/}
      <div className='white f3'>
        {`${name}, your current entry count is...`}
      </div>
      {/*Displaying the number of entries*/}
      <div className='white f1'>
        {entries}
      </div>
    </div>
  );
}

export default Rank;