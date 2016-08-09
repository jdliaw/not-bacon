import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updatePreview, saveTheme, fetchStyles } from '../actions'
import Section from '../components/section'

class SectionContainer extends Component {
  componentDidMount() {
    // fetch styles to load
    this.props.dispatch(fetchStyles())
  }

  render() {
    const { masterField, fields, selectOptions, updateSwatch, saveTheme } = this.props
    return (
      <Section
        masterField={masterField}
        fields={fields}
        selectOptions={selectOptions}
        updateSwatch={updateSwatch}
        saveTheme={saveTheme}
      />
    )
  }
}

SectionContainer.propTypes = {
  masterField: PropTypes.object.isRequired,
  fields: PropTypes.array.isRequired,
  selectOptions: PropTypes.array.isRequired,
  updateSwatch: PropTypes.func.isRequired,
  saveTheme: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    masterField: typeof state.fields[0] !== 'undefined' ? state.fields[0] : Object.assign({}, { id: 1, name: "placeholder", preview: "#fff", value: "#fff" }),
    fields: state.fields.slice(1, state.fields.length),
    selectOptions: ["Monochrome", "Complementary", "Split-Complementary", "Double-Complementary", "Analogous", "Triadic"]
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
    saveTheme: () => {
      dispatch(saveTheme())
    },
    dispatch: dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SectionContainer)
