import React from 'react';
import './index.css';

const ItemOrPlayerStatus = ({ data }) => {
  // need to set cooldown
  return (
    <div className='item-status'>
      <h3>Item Or Player Status</h3>
      <p>Attributes: {data.attributes}</p>
      <p>Description: {data.description}</p>
      <p>Exp: {data.exp}</p>
      <p>Item Type: {data.itemtype}</p>
      <p>Level: {data.level}</p>
      <p>Name: {data.name}</p>
      <p>Weight: {data.weight}</p>
      <p>Errors: {data.errors}</p>
      <p>Messages: {data.messages}</p>
    </div>
  );
};

export default ItemOrPlayerStatus;
