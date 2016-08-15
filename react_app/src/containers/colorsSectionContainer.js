import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updatePreview, getColorScheme, saveTheme, fetchStyles } from '../actions'
import ColorsSection from '../components/colorsSection'

class ColorsSectionContainer extends Component {
  componentDidMount() {
    // fetch styles to load
    this.props.dispatch(fetchStyles())
  }

  render() {
    const { masterField, fields, colors, colorScheme, selectOptions, updateSwatch, chooseColorScheme, saveTheme } = this.props
    return (
      <ColorsSection
        masterField={masterField}
        fields={fields}
        colors={colors}
        colorScheme={colorScheme}
        selectOptions={selectOptions}
        updateSwatch={updateSwatch}
        chooseColorScheme={chooseColorScheme}
        saveTheme={saveTheme}
      />
    )
  }
}

ColorsSectionContainer.propTypes = {
  masterField: PropTypes.object.isRequired,
  fields: PropTypes.array.isRequired,
  colors: PropTypes.array.isRequired,
  colorScheme: PropTypes.string.isRequired,
  selectOptions: PropTypes.array.isRequired,
  updateSwatch: PropTypes.func.isRequired,
  chooseColorScheme: PropTypes.func.isRequired,
  saveTheme: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    masterField: typeof state.colorFields[0] !== 'undefined' ? state.colorFields[0] : Object.assign({}, { id: 1, name: "placeholder", preview: "#fff", value: "#fff" }),
    fields: state.colorFields.slice(1, state.colorFields.length),
    colors: state.colorSchemeModule, //[{ id: 0, value: "rgb(135, 206, 235)" }, { id: 1, value: "rgb(135, 172, 235)" }, { id: 2, value: "rgb(135, 139, 235)" }, { id: 3, value: "rgb(164, 135, 235)" }],
    colorScheme: state.colorScheme,
    selectOptions: ["Monochromatic", "Complementary", "Split-Complementary", "Double-Complementary", "Analogous", "Triadic"]
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
    chooseColorScheme: (masterColor, scheme) => {
      dispatch(getColorScheme(masterColor, scheme))
    },
    saveTheme: () => {
      dispatch(saveTheme())
    },
    dispatch: dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ColorsSectionContainer)
