import React, { Component, PropTypes } from 'react';
import TextInput from './textInput';
import ColorMaster from './colorMaster';

const ColorsSection = ({ masterField, fields, selectOptions, colors, colorScheme, updateSwatch, chooseColorScheme, saveTheme }) => (
  	<div className="container">
  		<div className="row">
  			<div className="col-md-10 col-sm-12">
		  		<div className="row">
		  			<div className="col-md-8">
		  				<h2 className="style-type">Colors</h2>
		  				<h6 className="style-type-description">Brand colors for use across your shop.</h6>
		  			</div>
		  		</div>
          <div className="row style-input-row">
            <ColorMaster
              field={masterField}
              updateSwatch={updateSwatch}
              chooseColorScheme={(id, value) => chooseColorScheme(id, value)}
              selectOptions={selectOptions}
              colorScheme={colorScheme}
              colors={colors}
            />
          </div>
          <hr />
		  		<div className="row style-input-row">
            {
              fields.map(field =>
                <TextInput
                  key={field.id}
                  {...field}
                  updateSwatch={(id, name, value) => updateSwatch(id, name, value)}
                  colors={colors}
                />
            )}
		  		</div>
          <div className="row">
            <div className="col-md-4 col-md-offset-8 col-sm-4 col-sm-offset-8">
              <input className="btn btn-primary" id="submit" type="submit" value="Save" onClick={saveTheme} />
            </div>
          </div>
		  	</div>
	  	</div>
  	</div>
  )

ColorsSection.propTypes = {
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
  colorScheme: PropTypes.string.isRequired,
  colors: PropTypes.array.isRequired,
  selectOptions: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  updateSwatch: PropTypes.func.isRequired,
  chooseColorScheme: PropTypes.func.isRequired,
  saveTheme: PropTypes.func.isRequired
}

export default ColorsSection
