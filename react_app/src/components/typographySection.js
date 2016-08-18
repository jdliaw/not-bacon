import React, { Component, PropTypes } from 'react';
import SelectInput from './selectInput';

const TypographySection = ({ fields, selectOptions, updateField, saveTheme }) => (
  <div className="container">
    <div className="row">
      <div className="col-md-10 col-sm-12">
        <div className="row">
          <div className="col-md-8">
            <h2 className="style-type">Typography</h2>
            <h6 className="style-type-description">Font, line-height, and color for body text, headings, and more.</h6>
          </div>
        </div>
        <div className="row style-input-row">
          {
            fields.map(field =>
              <SelectInput
                key={field.id}
                id={field.id}
                name={field.name}
                value={field.value}
                options={selectOptions}
                onInputChange={(id, value) => updateField(id, value)}
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

TypographySection.propTypes = {
  fields: PropTypes.array.isRequired,
  selectOptions: PropTypes.array.isRequired,
  updateField: PropTypes.func.isRequired,
  saveTheme: PropTypes.func.isRequired
}

export default TypographySection
