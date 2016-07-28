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
    const { fields, onInputChange, onClickHandler } = this.props
    return (
      <Section
        fields={fields}
        onInputChange={onInputChange}
        onClickHandler={onClickHandler}
      />
    )
  }
}

SectionContainer.propTypes = {
  fields: PropTypes.array.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onClickHandler: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired
}


const mapStateToProps = (state) => {
  return {
    fields: state.fields
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onInputChange: (id, name, preview) => {
      // validate hex colors
      var isHexColor = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(preview)
      if (isHexColor && preview != "") {
        $('#' + name + '-input').removeClass('form-control-danger')
        $('#' + name + '-div').removeClass('has-danger')
        dispatch(updatePreview(id, preview))
      }
      // but no warning if didn't change anything
      else if (!isHexColor && preview != "") {
        $('#' + name + '-input').addClass('form-control-danger')
        $('#' + name + '-div').addClass('has-danger')
      }
    },
    onClickHandler: () => {
      dispatch(saveTheme())
    },
    dispatch: dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SectionContainer)