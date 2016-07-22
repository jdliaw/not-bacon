import { connect } from 'react-redux'
import { updatePreview } from '../actions'
import { Colors } from '../components/colors'

const mapStateToProps = (state) => {
  debugger
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

const Fields = connect(
  mapStateToProps,
  mapDispatchToProps
)(Colors)

export default Fields