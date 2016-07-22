import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updatePreview } from '../actions';

const InputField= ({id, name, preview, value, onBlur}) => {
  var style = {
    background: "linear-gradient(to left, " + preview + ", " + preview + " 17%, transparent 17%, transparent 100%)"
  };

  return (
  	<div className="style-input-div col-xs-4">
	  	<label id={name}>
	  		{name}
	  	</label>
  		<input className="form-control style-input"
             type="text"
             placeholder={value}
             style={style}
             onBlur={onBlur}
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
