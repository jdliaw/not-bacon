import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updatePreview } from '../actions';

const InputField = ({id, name, preview, value, onBlur}) => {
  var style = {
    background: preview,
    color: preview
  };

  var isHexColor = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test('#aabbcc')

  return (
    <div className="style-input-div input-group col-md-4 col-sm-6 col-xs-12">
      <label id={name}>
        @{name}
      </label>
      <div className="input-group">
        <input className="form-control style-input"
               type="text"
               placeholder={value}
               onBlur={e => (/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(e.target.value) || e.target.value == "") ? onBlur(id, e.target.value) : alert("Invalid hex color")}
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
