import React, { PropTypes } from 'react'
import TextInput from './textInput'
import SelectInput from './selectInput'

const ComponentModule = ({ name, fields, colors, updateSwatch, updateField, dispatch }) => {
  function getFields(fields) {
    return fields.map((field) => {
      switch (field.type) {
        case 'hex':
          return (
            <TextInput
              key={field.id}
              {...field}
              updateSwatch={(id, name, value) => updateSwatch(id, name, value)}
              colors={colors}
            />
          )
          break;
        case 'selector':
          return (
            <SelectInput
              key={field.id}
              {...field}
              options={["Arial","Helvetica", "Tahoma", "Trebuchet", "Verdana", "Other"]}
              onInputChange={(id, value) => updateField(id, value)}
            />
          )
          break;
        default:
          return null
      }
    })
  }

	return (
    <div className="component-module col-lg-4 col-md-6 col-sm-12">
  		<h5 className="component-name">{name}</h5>
  		{
        getFields(fields)
      }
      <hr />
  	</div>
  )
}

ComponentModule.propTypes = {
	name: PropTypes.string.isRequired,
	fields: PropTypes.array.isRequired,
  colors: PropTypes.array.isRequired,
  updateSwatch: PropTypes.func.isRequired,
  updateField: PropTypes.func.isRequired
}

export default ComponentModule
