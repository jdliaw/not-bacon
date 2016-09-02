import React, { Component, PropTypes } from 'react'
import { connect, dispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { checkConflicts, updateValue, saveTheme } from '../actions'
import ComponentsSection from '../components/componentsSection'
import ColorInput from '../components/colorInput'
import SelectInput from '../components/selectInput'

const mapStateToProps = (state, dispatch) => {
	return {
		components: state.componentFields,
		colors: state.colorSchemeModule
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		updateSwatch: (id, name, preview, componentId) => {
			// validate hex colors (reset warnings if fine)
      var isHexColor = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(preview)
      if (isHexColor && preview != "") {
        $('#' + id + '-input').removeClass('form-control-danger')
        $('#' + id + '-div').removeClass('has-danger')
        $('#comp-color-invalid').hide()
        dispatch(checkConflicts(id, name, preview, componentId))
      }
      // add warnings if not valid
      else if (!isHexColor && preview != "") {
        $('#' + id + '-input').addClass('form-control-danger')
        $('#' + id + '-div').addClass('has-danger')
        $('#comp-color-invalid').show()
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

