import React, { Component } from 'react';

export function InputFields({id, initialValue}) {
  var style = {
    background: "linear-gradient(to left, " + initialValue + ", " + initialValue + " 17%, transparent 17%, transparent 100%)"
  };

  return (
  	<div className="style-input-div">
	  	<label id={id}>
	  		{id}
	  	</label>
  		<input className="form-control style-input" type="text" placeholder={initialValue} style={style} />
  	</div>
  )
}