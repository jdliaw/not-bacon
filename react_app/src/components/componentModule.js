import React, { PropTypes } from 'react'
import TextInput from './textInput'
import SelectInput from './selectInput'

const ComponentModule = ({ name, fields, updateSwatch, updateField, dispatch }) => {
  function getFields(fields) {
    return fields.map((field) => {
      switch (field.type) {
        case 'hex':
          return (
            <TextInput
              key={'c'+ field.id}
              {...field}
              updateSwatch={(id, name, value) => updateSwatch(id, name, value)}
              colors={[]}
            />
          )
          break;
        case 'selector':
          return (
            <SelectInput
              key={'c' + field.id}
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
    <div className="col-lg-4 col-md-6 col-sm-12">
  		<h5>{name}</h5>
  		{
        getFields(fields)
      }
  	</div>
  )
}

ComponentModule.propTypes = {
	name: PropTypes.string.isRequired,
	fields: PropTypes.array.isRequired,
  updateSwatch: PropTypes.func.isRequired,
  updateField: PropTypes.func.isRequired
}

export default ComponentModule
