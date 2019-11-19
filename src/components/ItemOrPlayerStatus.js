import React from "react";

const ItemOrPlayerStatus = ({ data }) => {
  // need to set cooldown
  return (
    <>
      <h6>Item Or Player Status</h6>
      <p>Attributes: {data.attributes}</p>
      <p>Description: {data.description}</p>
      <p>Exp: {data.exp}</p>
      <p>Item Type: {data.itemtype}</p>
      <p>Level: {data.level}</p>
      <p>Name: {data.name}</p>
      <p>Weight: {data.weight}</p>
      <p>Errors: {data.errors}</p>
      <p>Messages: {data.messages}</p>
    </>
  );
};

export default ItemOrPlayerStatus;
