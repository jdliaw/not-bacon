import React, { Component, PropTypes } from 'react';

const SelectInput = ({ options }) => {
  return (
    <div className="form-group col-md-4 col-sm-6 col-xs-12">
      <label>Color Scheme</label>
      <select className="form-control" id="color-scheme">
        {
          options.map(option =>
            <option key={options.findIndex(x => x === option)} >{option}</option>
          )
        }
      </select>
    </div>
  )
}

SelectInput.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
}

export default SelectInput
