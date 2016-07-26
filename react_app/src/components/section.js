import React, { Component } from 'react';
import InputField from './inputField';

const Section = ({ fields, onInputChange }) => (
  	<div className="container">
  		<div className="row">
  			<div className="col-md-10 col-sm-12">
		  		<div className="row">
		  			<div className="col-md-8">
		  				<h2 className="style-type">Colors</h2>
		  				<h6 className="style-type-description">Gray and brand colors for use across Bootstrap.</h6>
		  			</div>
		  		</div>
		  		<div className="row">
            {
              fields.map(field =>
                <InputField
                  key={field.id}
                  {...field}
                  onBlur={(id, value) => onInputChange(id, value)}
                />
            )}
		  		</div>
		  	</div>
	  	</div>
  	</div>
  )

Section.propTypes = {
  fields: React.PropTypes.arrayOf(React.PropTypes.shape({
    id: React.PropTypes.number.isRequired,
    name: React.PropTypes.string.isRequired,
    preview: React.PropTypes.string.isRequired,
    value: React.PropTypes.string.isRequired
  }).isRequired).isRequired,
  onInputChange: React.PropTypes.func.isRequired
}

export default Section
