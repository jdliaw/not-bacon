import React, { Component, PropTypes } from 'react';
import InputField from './inputField';
import ColorMaster from './colorMaster';

const Section = ({ masterField, fields, selectOptions, updateSwatch, saveTheme }) => (
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
            <ColorMaster
              field={masterField}
              updateSwatch={updateSwatch}
              selectOptions={selectOptions}
            />
          </div>
          <hr />
		  		<div className="row style-input-row">
            {
              fields.map(field =>
                <InputField
                  key={field.id}
                  {...field}
                  updateSwatch={(id, name, value) => updateSwatch(id, name, value)}
                />
            )}
		  		</div>
          <div className="row">
            <div className="col-md-4 col-md-offset-8">
              <input className="btn btn-primary" id="submit" type="submit" value="Save" onClick={saveTheme} />
            </div>
          </div>
		  	</div>
	  	</div>
  	</div>
  )

Section.propTypes = {
  masterField: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
  }).isRequired,
  fields: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
  }).isRequired).isRequired,
  selectOptions: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  updateSwatch: PropTypes.func.isRequired,
  saveTheme: PropTypes.func.isRequired
}

export default Section
