import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updatePreview, updateValue, getColorScheme, saveTheme, fetchStyles, configureState } from '../actions'
import VariablesSection from '../components/variablesSection'

class VariablesSectionContainer extends Component {
  componentDidMount() {
    // import config file as json object
    var data = require('!json!../config.json')
    // configure state according to the json config
    this.props.dispatch(configureState(data))
    // fetch values from API
    this.props.dispatch(fetchStyles())
  }

  render() {
    const { masterField, hexFields, selectFields, colors, colorScheme, colorSchemeOptions, fontOptions, updateSwatch, updateField, chooseColorScheme, saveTheme } = this.props
    return (
      <VariablesSection
        {...this.props}
      />
    )
  }
}

VariablesSectionContainer.propTypes = {
  masterField: PropTypes.object.isRequired,
  hexFields: PropTypes.array.isRequired,
  selectFields: PropTypes.array.isRequired,
  colors: PropTypes.array.isRequired,
  colorScheme: PropTypes.string.isRequired,
  colorSchemeOptions: PropTypes.array.isRequired,
  fontOptions: PropTypes.array.isRequired,
  updateSwatch: PropTypes.func.isRequired,
  updateField: PropTypes.func.isRequired,
  chooseColorScheme: PropTypes.func.isRequired,
  saveTheme: PropTypes.func.isRequired
}

function getFieldsOfType(fields, type) {
  let result = []
  fields.map((field) => {
    if (field.type === type) {
      result.push(field)
    }
  })
  return result
}

const mapStateToProps = (state) => {
  return {
    masterField: typeof state.variableFields[0] !== 'undefined' ? state.variableFields[0] : Object.assign({}, { id: "1", name: "placeholder", preview: "#fff", value: "#fff" }),
    hexFields: getFieldsOfType(state.variableFields.slice(1, state.variableFields.length), 'hex'),
    selectFields: getFieldsOfType(state.variableFields.slice(1, state.variableFields.length), 'selector'),
    colors: state.colorSchemeModule,
    colorScheme: state.colorScheme,
    colorSchemeOptions: ["Analogous", "Monochromatic", "Split-Complementary", "Triad", "Tetrad"],
    fontOptions: ["Arial", "Helvetica", "Tahoma", "Trebuchet", "Verdana", "Other"]
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateSwatch: (id, name, preview) => {
      // validate hex colors (reset warnings if fine)
      var isHexColor = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(preview)
      if (isHexColor && preview != "") {
        $('#' + id + '-input').removeClass('form-control-danger')
        $('#' + id + '-div').removeClass('has-danger')
        $('#var-color-invalid').hide()
        dispatch(updatePreview(null, id, preview))
      }
      // add warnings if not valid
      else if (!isHexColor && preview != "") {
        $('#' + id + '-input').addClass('form-control-danger')
        $('#' + id + '-div').addClass('has-danger')
        $('#var-color-invalid').show()
      }
    },
    updateField: (id, value) => {
      // for 'Other' option in select fields to type a link
      let inputID = "#editable-" + id
      if (value === 'Other') {
        $(inputID).val('Enter URL...')
        $(inputID).show()
        $(inputID).parent().css('margin-bottom', '-20px')
      }
      else {
        $(inputID).hide()
      }
      dispatch(updateValue(null, id, value))
    },
    chooseColorScheme: (masterColor, scheme) => {
      dispatch(getColorScheme(masterColor, scheme))
    },
    saveTheme: () => {
      dispatch(saveTheme())
    },
    dispatch: dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VariablesSectionContainer)
