import React, { Component } from 'react';
import InputField from './inputField';

const Section = ({ fields, onInputChange, onClickHandler }) => (
  	<div className="container">
  		<div className="row">
  			<div className="col-md-10 col-sm-12">
		  		<div className="row">
		  			<div className="col-md-8">
		  				<h2 className="style-type">Colors</h2>
		  				<h6 className="style-type-description">Gray and brand colors for use across Bootstrap.</h6>
		  			</div>
		  		</div>
		  		<div className="row style-input-row">
            {
              fields.map(field =>
                <InputField
                  key={field.id}
                  {...field}
                  onBlur={(id, name, value) => onInputChange(id, name, value)}
                />
            )}
		  		</div>
          <div className="row">
            <div className="col-md-4 col-md-offset-8">
              <input className="btn btn-primary" id="submit" type="submit" value="Save" onClick={onClickHandler} />
            </div>
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
  onInputChange: React.PropTypes.func.isRequired,
  onClickHandler: React.PropTypes.func.isRequired
}

export default Section
