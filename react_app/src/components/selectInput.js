import React, { Component, PropTypes } from 'react';

const SelectInput = ({ id, name, value, options, onInputChange }) => {
  let editableID = "editable-" + id;

  return (
    <div className="form-group col-md-4 col-sm-6 col-xs-12">
      <label>{name}</label>
      <select className="form-control select-input" onChange={e => onInputChange(id, e.target.value)} value={value}>
        {
          options.map(option =>
            <option key={options.findIndex(x => x === option)} >{option}</option>
          )
        }
      </select>
      <input className="editable" id={editableID} type="text" key={id} style={{display: "none"}} />
    </div>
  )
}

SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  onInputChange: PropTypes.func.isRequired
}

export default SelectInput
