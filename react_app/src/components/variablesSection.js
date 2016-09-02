import React, { PropTypes } from 'react'
import ColorMaster from './colorMaster'
import TextInput from './textInput'
import SelectInput from './selectInput'

const VariablesSection = ({ masterField, hexFields, selectFields, colors, colorScheme, colorSchemeOptions, fontOptions, updateSwatch, updateField, chooseColorScheme, saveTheme }) => (
  <div className="container">
    <div className="row">
      <div className="col-lg-8 col-md-12 col-sm-12">
        <h2 className="style-type">Variables</h2>
        <h6 className="style-type-description">Brand colors, fonts, and more for use across your shop.</h6>
      </div>
      <div className="col-lg-4 col-md-12 col-sm-12">
        <div className="alert alert-danger color-input-alert" id="var-color-invalid" role="alert">Please enter a valid hex value.</div>
      </div>
    </div>

    <div className="row style-input-row">
      <ColorMaster
        field={masterField}
        colors={colors}
        colorScheme={colorScheme}
        updateSwatch={updateSwatch}
        chooseColorScheme={(id, value) => chooseColorScheme(id, value)}
        selectOptions={colorSchemeOptions}
      />
    </div>
    <hr />

    <div className="row style-input-row">
      {
        hexFields.map(field =>
          <div className="col-md-4 col-sm-6 col-xs-12">
            <TextInput
              key={field.id}
              {...field}
              updateSwatch={(id, name, value) => updateSwatch(id, name, value)}
              colors={colors}
            />
          </div>
      )}
    </div>

    <div className="row style-input-row">
      {
        selectFields.map(field =>
          <div className="col-md-4 col-sm-6 col-xs-12">
            <SelectInput
              key={field.id}
              {...field}
              options={fontOptions}
              onInputChange={(id, value) => updateField(id, value)}
            />
          </div>
      )}
    </div>

    <div className="row">
      <div className="col-md-4 col-md-offset-8 col-sm-4 col-sm-offset-8">
        <input className="btn btn-primary" id="submit" type="submit" value="Save" onClick={saveTheme} />
      </div>
    </div>
  </div>
)

VariablesSection.propTypes = {
  masterField: PropTypes.object.isRequired,
  hexFields: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
  }).isRequired).isRequired,
  selectFields: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
  }).isRequired).isRequired,
  colors: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
  }).isRequired).isRequired,
  colorScheme: PropTypes.string.isRequired,
  colorSchemeOptions: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  fontOptions: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  updateSwatch: PropTypes.func.isRequired,
  updateField: PropTypes.func.isRequired,
  chooseColorScheme: PropTypes.func.isRequired,
  saveTheme: PropTypes.func.isRequired
}

export default VariablesSection
