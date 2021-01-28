/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import { ToggleOff, ToggleOn } from 'react-bootstrap-icons';
import logo from './logo.png';
import Dropdown from './Dropdown';

import items from './items.json';
import './App.scss';

function App() {
  const [multiSelect, setMultiSelect] = useState(false);
  const toggle = () => setMultiSelect(!multiSelect);
  return (
    <div className="container">
      <img src={logo} alt="Hive Logo" />

      <div className="switch-container">
        {multiSelect
          ? <p className="green-text">Multiselect Enabled</p>
          : <p>Enable Multiselect </p>}
        <span onClick={() => toggle()}>
          {multiSelect ? <ToggleOn className="green-text" size={24} /> : <ToggleOff size={24} />}
        </span>
      </div>

      <Dropdown title="Pick a fruit..." items={items} multiSelect={multiSelect} />
    </div>
  );
}

export default App;
