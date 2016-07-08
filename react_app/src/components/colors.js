import React, { Component } from 'react';
import { InputFields } from './inputFields';

export function Colors() {
  return (
  	<div className="container">
  		<div className="row">
  			<div className="col-xs-9">
		  		<div className="row">
		  			<div className="col-sm-6">
		  				<h2 className="style-type">Colors</h2>
		  				<h6 className="style-type-description">Gray and brand colors for use across Bootstrap.</h6>
		  			</div>
		  		</div>
		  		<div className="row">
		  			<div className="col-xs-4">
		  				<InputFields id="@gray-base" initialValue="#000"/>
		  			</div>
		  			<div className="col-xs-4">
		  				<InputFields id="@gray-darker" initialValue="lighten(@gray-base, 13.5%)"/>
		  			</div>
		  			<div className="col-xs-4">
		  				<InputFields id="@gray-dark" initialValue="lighten(@gray-base, 20%)"/>
		  			</div>
		  		</div>
		  		<div className="row">
		  			<div className="col-xs-4">
		  				<InputFields id="@gray" initialValue="#lighten(@gray-base, 33.5%)"/>
		  			</div>
		  			<div className="col-xs-4">
		  				<InputFields id="@gray-light" initialValue="lighten(@gray-base, 46.7%)"/>
		  			</div>
		  			<div className="col-xs-4">
		  				<InputFields id="@gray-lighter" initialValue="lighten(@gray-base, 93.5%)"/>
		  			</div>
		  		</div>
		  		<div className="row">
		  			<div className="col-xs-4">
		  				<InputFields id="@brand-primary" initialValue="darken(#48bc2a, 6.5%)"/>
		  			</div>
		  			<div className="col-xs-4">
		  				<InputFields id="@brand-success" initialValue="#5cb85c"/>
		  			</div>
		  			<div className="col-xs-4">
		  				<InputFields id="@brand-info" initialValue="#5bc0de"/>
		  			</div>
		  		</div>
		  		<div className="row">
		  			<div className="col-xs-4">
		  				<InputFields id="@brand-warning" initialValue="#f0ad4e"/>
		  			</div>
		  			<div className="col-xs-4">
		  				<InputFields id="@brand-danger" initialValue="#d9534f"/>
		  			</div>
		  		</div>
		  	</div>
	  	</div>
  	</div>
  )
}