import React, { Component, PropTypes } from 'react'
import { connect, dispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updatePreview, updateValue, saveTheme } from '../actions'
import ComponentsSection from '../components/componentsSection'
import TextInput from '../components/textInput'
import SelectInput from '../components/selectInput'

var data = require('!json!../config.json')

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
		components: state.componentFields
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

