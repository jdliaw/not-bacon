import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updatePreview, updateValue, getColorScheme, saveTheme, fetchStyles } from '../actions'
import VariablesSection from '../components/variablesSection'

class VariablesSectionContainer extends Component {
  componentDidMount() {
    this.props.dispatch(fetchStyles())
    // var data = require('!json!../config.json')
    // console.log('data', data)
  }

  render() {
    const { masterField, hexFields, selectFields, colors, colorScheme, colorSchemeOptions, fontOptions, updateSwatch, updateField, chooseColorScheme, saveTheme } = this.props
    return (
      <VariablesSection
        masterField={masterField}
        hexFields={hexFields}
        selectFields={selectFields}
        colors={colors}
        colorScheme={colorScheme}
        colorSchemeOptions={colorSchemeOptions}
        fontOptions={fontOptions}
        updateSwatch={updateSwatch}
        updateField={updateField}
        chooseColorScheme={chooseColorScheme}
        saveTheme={saveTheme}
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

const mapStateToProps = (state) => {
  return {
    masterField: typeof state.colorFields[0] !== 'undefined' ? state.colorFields[0] : Object.assign({}, { id: 1, name: "placeholder", preview: "#fff", value: "#fff" }),
    hexFields: state.colorFields.slice(state.colorFields.length-3, state.colorFields.length),
    selectFields: state.typographyFields,
    colors: state.colorSchemeModule,
    colorScheme: state.colorScheme,
    colorSchemeOptions: ["Analogous", "Monochromatic", "Split-Complementary", "Triad", "Tetrad"],
    fontOptions: ["Arial","Helvetica", "Tahoma", "Trebuchet", "Verdana", "Other"]
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateSwatch: (id, name, preview) => {
      // validate hex colors (reset warnings if fine)
      var isHexColor = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(preview)
      if (isHexColor && preview != "") {
        $('#' + name + '-input').removeClass('form-control-danger')
        $('#' + name + '-div').removeClass('has-danger')
        dispatch(updatePreview(id, preview))
      }
      // add warnings if not valid
      else if (!isHexColor && preview != "") {
        $('#' + name + '-input').addClass('form-control-danger')
        $('#' + name + '-div').addClass('has-danger')
      }
    },
    updateField: (id, value) => {
      let inputID = "#editable-" + id
      if (value === 'Other') {
        $(inputID).val('Enter URL...')
        $(inputID).show()
      }
      else {
        $(inputID).hide()
      }
      dispatch(updateValue(id, value))
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
