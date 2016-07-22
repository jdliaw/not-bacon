import React, { Component } from 'react';
import { InputFields } from './inputFields';

export function Colors() {
  return (
  	<div className="container">
  		<div className="row">
  			<div className="col-md-10">
		  		<div className="row">
		  			<div className="col-md-6">
		  				<h2 className="style-type">Colors</h2>
		  				<h6 className="style-type-description">Gray and brand colors for use across Bootstrap.</h6>
		  			</div>
		  		</div>
		  		<div className="row">
		  			<div className="col-xs-4">
		  				<InputFields name="@gray-base" initialValue="#000"/>
		  			</div>
		  			<div className="col-xs-4">
		  				<InputFields name="@gray-darker" initialValue="#f7f7f9"/>
		  			</div>
		  			<div className="col-xs-4">
		  				<InputFields name="@gray-dark" initialValue="#373a3c"/>
		  			</div>
		  		</div>
		  		<div className="row">
		  			<div className="col-xs-4">
		  				<InputFields name="@gray" initialValue="#55595c"/>
		  			</div>
		  			<div className="col-xs-4">
		  				<InputFields name="@gray-light" initialValue="#818a91"/>
		  			</div>
		  			<div className="col-xs-4">
		  				<InputFields name="@gray-lighter" initialValue="#eceeef"/>
		  			</div>
		  		</div>
		  		<div className="row">
		  			<div className="col-xs-4">
		  				<InputFields name="@brand-primary" initialValue="#0275d8"/>
		  			</div>
		  			<div className="col-xs-4">
		  				<InputFields name="@brand-success" initialValue="#5cb85c"/>
		  			</div>
		  			<div className="col-xs-4">
		  				<InputFields name="@brand-info" initialValue="#5bc0de"/>
		  			</div>
		  		</div>
		  		<div className="row">
		  			<div className="col-xs-4">
		  				<InputFields name="@brand-warning" initialValue="#f0ad4e"/>
		  			</div>
		  			<div className="col-xs-4">
		  				<InputFields name="@brand-danger" initialValue="#d9534f"/>
		  			</div>
		  		</div>
		  	</div>
	  	</div>
  	</div>
  )
}
