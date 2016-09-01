import React, { Component, PropTypes } from 'react'
import { connect, dispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updatePreview, updateValue, saveTheme } from '../actions'
import ComponentsSection from '../components/componentsSection'
import TextInput from '../components/textInput'
import SelectInput from '../components/selectInput'

const mapStateToProps = (state, dispatch) => {
	return {
		components: state.componentFields
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		updateSwatch: (id, name, preview, componentId) => {
			// validate hex colors (reset warnings if fine)
      var isHexColor = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(preview)
      if (isHexColor && preview != "") {
        $('#' + name + '-input').removeClass('form-control-danger')
        $('#' + name + '-div').removeClass('has-danger')
        dispatch(updatePreview(componentId, id, preview))
      }
      // add warnings if not valid
      else if (!isHexColor && preview != "") {
        $('#' + name + '-input').addClass('form-control-danger')
        $('#' + name + '-div').addClass('has-danger')
      }
		},
		updateField: (id, value, componentId) => {
			let inputID = "#editable-" + id
      if (value === 'Other') {
        $(inputID).val('Enter URL...')
        $(inputID).show()
        $(inputID).parent().css('margin-bottom', '-20px')
      }
      else {
        $(inputID).hide()
      }
      dispatch(updateValue(componentId, id, value))
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

