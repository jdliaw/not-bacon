import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateValue, saveTheme, fetchStyles } from '../actions'
import TypographySection from '../components/typographySection'

class TypographySectionContainer extends Component {
  render() {
    const { masterField, fields, selectOptions, updateField, saveTheme } = this.props
    return (
      <TypographySection
        fields={fields}
        selectOptions={selectOptions}
        updateField={updateField}
        saveTheme={saveTheme}
      />
    )
  }
}

TypographySectionContainer.propTypes = {
  fields: PropTypes.array.isRequired,
  selectOptions: PropTypes.array.isRequired,
  updateField: PropTypes.func.isRequired,
  saveTheme: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    fields: state.typographyFields,
    selectOptions: ["Arial","Helvetica", "Tahoma", "Trebuchet", "Verdana"]
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateField: (id, value) => {
      dispatch(updateValue(id, value))
    },
    saveTheme: () => {
      dispatch(saveTheme())
    },
    dispatch: dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TypographySectionContainer)