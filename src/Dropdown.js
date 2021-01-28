import React, { useEffect, useState } from 'react';
import onClickOutside from 'react-onclickoutside';
import { CaretUpFill, CaretDownFill } from 'react-bootstrap-icons';

function Dropdown({ title, items, multiSelect }) {
  // Array to store selected items
  const [selection, setSelection] = useState([]);

  // Visibility state for dropdown menu items
  const [open, setOpen] = useState(false);

  // Switches boolean value of visiblity state
  const toggle = () => setOpen(!open);

  // Clear selection array when multiSelect prop is changed by parent component
  useEffect(() => {
    setSelection([]);
  }, [multiSelect]);

  // Event Handler for when an item in the list is clicked
  const handleOnClick = (item) => {
    // Checks if the item clicked on is a different item
    if (!selection.find((current) => current.id === item.id)) {
      // If multiSelect is not enabled,
      // make the selection list the newly selected item
      if (!multiSelect) {
        setSelection([item]);
      } else if (multiSelect) {
        // Else, append the newly selected item to the selection array
        // Spread operator to append item to selection state
        setSelection([...selection, item]);
      }
    } else {
      // We clicked on the same item, so unselect it
      setSelection([...selection.filter((current) => current.id !== item.id)]);
    }
  };

  const isItemInSelection = (item) => selection.find(
    (current) => current.id === item.id,
  );

  // When Dropdown is clicked outside, close it
  Dropdown.handleClickOutside = () => setOpen(false);

  return (
    <div className="dropdown-wrapper">
      <div
        tabIndex={0}
        className="dropdown-header"
        role="button"
        onKeyPress={() => toggle()}
        onClick={() => toggle()}
      >
        <p>{title}</p>
        <p>{open ? <CaretUpFill size={16} /> : <CaretDownFill size={16} />}</p>
      </div>
      {open && (
        <ul className="dropdown-list">
          {items.map((item) => (
            <li className="dropdown-list-item" key={item.id}>
              <button type="button" onClick={() => handleOnClick(item)}>
                <span>{item.value}</span>
                <span>{isItemInSelection(item) && 'Selected'}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const clickOutsideConfig = {
  handleClickOutside: () => Dropdown.handleClickOutside,
};

export default onClickOutside(Dropdown, clickOutsideConfig);
