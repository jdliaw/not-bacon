import React, { PropTypes } from 'react'
import TextInput from './textInput'
import SelectInput from './selectInput'

const ComponentModule = ({ name, fields, updateSwatch, updateField, dispatch }) => {
  function getFields(data) {
    let fields = []
    for (let [key, field] of Object.entries(data)) {
      switch (field.type) {
        case 'hex':
          fields.push(
            <TextInput
              key={'c'+ Object.keys(data).indexOf(key)}
              id={Object.keys(data).indexOf(key)}
              name={key}
              preview={field.default}
              value={field.default}
              updateSwatch={(id, name, value) => updateSwatch(id, name, value)}
              colors={[]}
            />
          )
          break;
        case 'selector':
          fields.push(
            <SelectInput
              key={'c' + Object.keys(data).indexOf(key)}
              id={Object.keys(data).indexOf(key)}
              name={key}
              value={field.default}
              options={["Arial","Helvetica", "Tahoma", "Trebuchet", "Verdana", "Other"]}
              onInputChange={(id, value) => updateField(id, value)}
            />
          )
          break;
        default:
          return null
      }
    }
    return fields
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
	fields: PropTypes.object.isRequired,
  updateSwatch: PropTypes.func.isRequired,
  updateField: PropTypes.func.isRequired
}

export default ComponentModule
