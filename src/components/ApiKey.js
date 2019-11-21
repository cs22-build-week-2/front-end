import React, { useState, useEffect } from 'react';
import './index.css';

const ApiKey = () => {
  const [key, setKey] = useState('');
  const [currentApiKey, setCurrentApiKey] = useState('');

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setCurrentApiKey(localStorage.getItem('token'));
    }
  }, []);

  const onApiKeyChange = event => {
    setKey(event.target.value);
  };

  const onApiKeySubmit = event => {
    event.preventDefault();
    localStorage.setItem('token', key);
    setCurrentApiKey(key);
  };

  return (
    <>
      <div className='api-key'>
        <div>
          <form onSubmit={event => onApiKeySubmit(event)}>
            <label htmlFor='token'>Input your API Key here!</label>
            <input
              name='token'
              placeholder='Type in your api key'
              onChange={event => onApiKeyChange(event)}
              value={key}
            />
            <button type='submit'>Set Api Key</button>
          </form>
        </div>
        <div className='current-key'>
          <h3>Current Api Key</h3>
          <p>{currentApiKey}</p>
        </div>
      </div>
    </>
  );
};

export default ApiKey;
