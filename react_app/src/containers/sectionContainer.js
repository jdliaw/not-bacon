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
    onInputChange: (id, preview) => {
      dispatch(updatePreview(id, preview))
    }
  }
}

const SectionContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Section)

export default SectionContainer