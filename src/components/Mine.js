import React, { useState } from 'react';
import { getLastProof } from '../endpointCalls';

const Mine = () => {
  const [proof, setProof] = useState({
    cooldown: 0,
    difficulty: 0,
    errors: [],
    messages: [],
    proof: 0
  });

  const displayLastProof = () => {
    getLastProof()
      .then(res => {
        const errors = JSON.stringify(res.data.errors);
        const messages = JSON.stringify(res.data.messages);
        setProof({ ...res.data, errors, messages });
      })
      .catch(err => console.log(err));
  };

  return (
    <>
      <h3>Mine</h3>
      <button type='button' onClick={displayLastProof} disabled={proof.cooldown}>
        Last Proof
      </button>
      <p>Proof: {proof.proof}</p>
      <p>Cooldown: {proof.cooldown}</p>
      <p>Difficulty: {proof.difficulty}</p>
      <p>Messages: {proof.messages}</p>
      <p>Errors: {proof.errors}</p>
    </>
  );
};

export default Mine;
