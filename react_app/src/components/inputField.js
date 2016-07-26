import React, { Component } from 'react';
import { PropTypes } from 'react';
import { connect } from 'react-redux';
import { updatePreview } from '../actions';

const InputField = ({id, name, preview, value, onBlur}) => {
  var style = {
    background: preview,
    color: preview
  };

  var divID = name + "-div";
  var inputID = name + "-input"

  return (
    <div className="style-input-div col-md-4 col-sm-6 col-xs-12" id={divID}>
      <label id={name}>
        @{name}
      </label>
      <div className="input-group">
        <input className="form-control style-input"
               id={inputID}
               type="text"
               placeholder={value}
               onBlur={e => onBlur(id, name, e.target.value)}
        />
        <span className="input-group-addon" style={style}>@</span>
      </div>
    </div>
  )
}

InputField.propTypes = {
  id: React.PropTypes.number.isRequired,
  name: React.PropTypes.string.isRequired,
  preview: React.PropTypes.string.isRequired,
  value: React.PropTypes.string.isRequired,
  onBlur: React.PropTypes.func.isRequired
}

export default InputField
