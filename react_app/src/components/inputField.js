import React, { Component, PropTypes } from 'react';
import { updatePreview } from '../actions';

const InputField = ({id, name, preview, value, updateSwatch}) => {
  var style = {
    background: preview,
    color: preview
  };

  var divID = name + "-div";
  var inputID = name + "-input"

  return (
    <div className="style-input-div col-md-4 col-sm-6 col-xs-12" id={divID}>
      <label id={name}>
        {name}
      </label>
      <div className="input-group">
        <input className="form-control style-input"
               id={inputID}
               type="text"
               placeholder={value}
               onBlur={e => updateSwatch(id, name, e.target.value)}
        />
        <span className="input-group-addon" id="input-preview" style={style}>@</span>
      </div>
    </div>
  )
}

InputField.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  preview: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  updateSwatch: PropTypes.func.isRequired
}

export default InputField
