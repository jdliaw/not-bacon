import { connect } from 'react-redux'
import { updatePreview } from '../actions'
import Section from '../components/section'

const mapStateToProps = (state) => {
  return {
    fields: state.fields
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onInputChange: (id, name, preview) => {
      var isHexColor = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(preview)
      if (isHexColor && preview != "") {
        $('#' + name + '-input').removeClass('form-control-danger')
        $('#' + name + '-div').removeClass('has-danger')
        dispatch(updatePreview(id, preview))
      }
      else if (!isHexColor && preview != "") {
        $('#' + name + '-input').addClass('form-control-danger')
        $('#' + name + '-div').addClass('has-danger')
      }
    }
  }
}

const SectionContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Section)

export default SectionContainer