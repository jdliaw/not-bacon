import React, { Component } from 'react';

export function InputFields({id, initialValue}) {

  return (
  	<div className="style-input">
	  	<label id={id}>
	  		{id}
	  	</label>
  		<input className="form-control" type="text" placeholder={initialValue}/>
  	</div>
  )
}