import React, { Component } from 'react';

export function InputFields({name, initialValue}) {
  var style = {
    background: "linear-gradient(to left, " + initialValue + ", " + initialValue + " 17%, transparent 17%, transparent 100%)"
  };

  propTypes: {
    value: React.PropTypes.element.isRequired
    handleChange: React.PropTypes.element.isRequired
  }

  return (
  	<div className="style-input-div">
	  	<label id={name}>
	  		{name}
	  	</label>
  		<input className="form-control style-input"
             type="text"
             placeholder={initialValue}
             style={style}/>
  	</div>
  )
}
