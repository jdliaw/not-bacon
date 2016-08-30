import React, { Component, PropTypes } from 'react'
import { connect, dispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updatePreview, updateValue, saveTheme } from '../actions'
import ComponentsSection from '../components/componentsSection'
import TextInput from '../components/textInput'
import SelectInput from '../components/selectInput'

var data = require('!json!../config.json')
console.log('components data', data)

const parseFields = (data) => {
	let fields = []
	for (let [key, field] of Object.entries(data)) {
		switch (field.type) {
			case 'hex':
				fields.push(
					<TextInput
						key={Object.keys(data).indexOf(key)}
						id={Object.keys(data).indexOf(key)}
						name={key}
						preview={field.default}
						value={field.default}
						colors={[]}
					/>
				)
				break;
			case 'selector':
				fields.push(
					<SelectInput
						key={Object.keys(data).indexOf(key)}
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

const getComponents = (data) => {
	return data.map((component) => {
		return Object.assign({}, {
			name: component.name,
			fields: component.styles
		})
	})
}

const mapStateToProps = (state, dispatch) => {
	return {
		components: getComponents(data.components)
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		updateSwatch: (id, name, preview) => {
			dispatch(updatePreview(id, preview))
		},
		updateField: (id, value) => {
			dispatch(updateValue(id, value))
		},
		saveTheme: () => {
			dispatch(saveTheme())
		},
		dispatch: dispatch
	}
}

const ComponentsSectionContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(ComponentsSection)

export default ComponentsSectionContainer

