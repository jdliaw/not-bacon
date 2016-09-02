import React, { Component, PropTypes } from 'react';
import ColorInput from './colorInput';
import SelectInput from './selectInput';
import ColorSchemeModule from './colorSchemeModule';

const ColorMaster = ({ field, colors, colorScheme, updateSwatch, chooseColorScheme, selectOptions }) => {
  return (
    <div>
      <div className="col-md-4 col-sm-6 col-xs-12">
        <ColorInput
          key={field.id}
          {...field}
          updateSwatch={(id, name, value) => updateSwatch(id, name, value)}
          colors={colors}
        />
      </div>

      <div className="col-md-4 col-sm-6 col-xs-12">
        <SelectInput
          id={field.preview}
          name="Color Scheme"
          value={colorScheme}
          options={selectOptions}
          onInputChange={chooseColorScheme}
        />
      </div>

      <ColorSchemeModule
        colors={colors}
      />
    </div>
  )
}

ColorMaster.propTypes = {
  field: PropTypes.object.isRequired,
  colorScheme: PropTypes.string.isRequired,
  colors: PropTypes.array.isRequired,
  updateSwatch: PropTypes.func.isRequired,
  chooseColorScheme: PropTypes.func.isRequired,
  selectOptions: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
}

export default ColorMaster
