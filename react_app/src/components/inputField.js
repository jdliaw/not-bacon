import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updatePreview } from '../actions';

const InputField = ({id, name, preview, value, onBlur}) => {
  var style = {
    background: "linear-gradient(to left, " + preview + ", " + preview + " 17%, transparent 17%, transparent 100%)"
  };

  var isHexColor = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test('#aabbcc')

  return (
    <div className="style-input-div col-xs-4">
      <label id={name}>
        @{name}
      </label>
      <input className="form-control style-input"
             type="text"
             placeholder={value}
             style={style}
             onBlur={e => (/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(e.target.value) || e.target.value == "") ? onBlur(id, e.target.value) : alert("Invalid hex color")}
      />
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
