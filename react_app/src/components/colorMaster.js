import React, { Component, PropTypes } from 'react';
import InputField from './inputField';
import SelectInput from './selectInput';
import { updatePreview } from '../actions';

const ColorMaster = ({ field, updateSwatch, selectOptions }) => {
  return (
    <form className="form-inline">
      <InputField
        key={field.id}
        {...field}
        updateSwatch={(id, name, value) => updateSwatch(id, name, value)}
      />

      <SelectInput
        options={selectOptions}
      />
    </form>
  )
}

ColorMaster.propTypes = {
  field: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
  }).isRequired,
  updateSwatch: PropTypes.func.isRequired,
  selectOptions: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
}

export default ColorMaster
