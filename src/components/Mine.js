import React, { useState, useEffect } from 'react';
import { getLastProof, mineCoin } from '../endpointCalls';

const Mine = () => {
  const [proof, setProof] = useState({
    cooldown: 0,
    difficulty: 0,
    errors: [],
    messages: [],
    proof: 0
  });
  const [wellMessage, setWellMessage] = useState('');
  const [decodedMessage, setDecodedMessage] = useState('');
  const [mineCooldown, setMineCooldown] = useState(0);
  const [newProof, setNewProof] = useState('');
  const [mineMessage, setMineMessage] = useState({
    cooldown: 0,
    errors: [],
    index: 0,
    messages: [],
    previous_hash: '',
    proof: 0,
    transactions: ''
  });

  useEffect(() => {
    const timer = setTimeout(function() {
      if (mineCooldown > 0) {
        setMineCooldown(mineCooldown - 1);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [mineCooldown]);

  const displayLastProof = () => {
    getLastProof()
      .then(res => {
        const errors = JSON.stringify(res.data.errors);
        const messages = JSON.stringify(res.data.messages);
        setProof({ ...res.data, errors, messages });
        setMineCooldown(res.data.cooldown);
      })
      .catch(err => console.log(err));
  };

  const onInputWellMessage = event => {
    setWellMessage(event.target.value);
  };

  const decodeMessage = () => {
    setDecodedMessage(
      wellMessage
        .split(' ')
        .filter((binary, binaryIndex) => binaryIndex % 5 === 2)
        .map(binary => parseInt(binary, 2))
        .map(decimal => String.fromCharCode(decimal))
        .join('')
    );
    setWellMessage('');
  };

  const onInputProof = event => {
    setNewProof(event.target.value);
  };

  const submitNewProof = event => {
    event.preventDefault();
    mineCoin(parseInt(newProof))
      .then(res => {
        setMineMessage(res.data);
        setMineCooldown(res.data.cooldown);
        setNewProof('');
      })
      .catch(err => console.log(err));
  };

  return (
    <>
      <h3>Mine</h3>
      <button type='button' onClick={displayLastProof} disabled={mineCooldown}>
        Last Proof
      </button>
      <p>Proof: {proof.proof}</p>
      <p>Difficulty: {proof.difficulty}</p>
      <p>Messages: {proof.messages}</p>
      <p>Errors: {proof.errors}</p>
      <form>
        <input
          type='text'
          value={wellMessage}
          onChange={event => onInputWellMessage(event)}
        />
        <button type='button' onClick={decodeMessage}>
          Decode Message
        </button>
        <p>Message: {decodedMessage}</p>
      </form>
      <form>
        <input
          type='text'
          value={newProof}
          onChange={event => onInputProof(event)}
        />
        <button type='button' onClick={event => submitNewProof(event)}>
          Submit Proof
        </button>
        <h3>Display Mine Message</h3>
        <p>Index: {mineMessage.index}</p>
        <p>Previous Hash: {mineMessage.previous_hash}</p>
        <p>Proof: {mineMessage.proof}</p>
        <p>Transactions: {mineMessage.transactions}</p>
        <p>Errors: {mineMessage.errors}</p>
      </form>
    </>
  );
};

export default Mine;
