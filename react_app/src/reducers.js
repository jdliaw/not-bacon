import { combineReducers } from 'redux'
import { UPDATE_PREVIEW, SAVE_THEME, BEFORE_SAVE_THEME,
  REQUEST_STYLES, REQUEST_STYLES_SUCCESS, REQUEST_STYLES_FAILURE,
  SAVE_STYLES, SAVE_STYLES_SUCCESS, SAVE_STYLES_FAILURE
} from './actions'

function isLoading(state = false, action) {
  switch (action.type) {
    case REQUEST_STYLES:
    case SAVE_STYLES:
      return true
    case REQUEST_STYLES_SUCCESS:
    case REQUEST_STYLES_FAILURE:
    case SAVE_STYLES_SUCCESS:
    case SAVE_STYLES_FAILURE:
      return false
    default:
      return state
  }
}

function requestFailed(state = false, action) {
  switch (action.type) {
    case REQUEST_STYLES_FAILURE:
    case SAVE_STYLES_FAILURE:
      return true
    case REQUEST_STYLES:
    case SAVE_STYLES:
    case REQUEST_STYLES_SUCCESS:
    case SAVE_STYLES_SUCCESS:
      return false
    default:
      return state
  }
}

function errorMessage(state = null, action) {
  switch (action.type) {
    case REQUEST_STYLES_FAILURE:
    case SAVE_STYLES_FAILURE:
      return action.error
    default:
      return state
  }
}

function fields(state = [], action) {
  switch (action.type) {
    case UPDATE_PREVIEW:
      return state.map((field) => {
        if (field.id === action.id) {
          return Object.assign({}, field, {
            preview: action.preview
          })
        }
        return field
      })
    case REQUEST_STYLES_SUCCESS:
      if (action.response.length > state.length) {
        return action.response.map((field) => {
          let key = Object.keys(field)[0]
          let value = Object.values(field)[0]

          return Object.assign({}, {
            id: action.response.findIndex((x) => Object.keys(x)[0] === key),
            name: key,
            preview: value,
            value: value
          })
        })
      }
      return state.map((existing_field) => {
        let index = action.response.findIndex((x) => Object.keys(x)[0] === existing_field.name)
        let value = Object.values(action.response[index])[0]

        return Object.assign({}, existing_field, {
          preview: value,
          value: value
        })
      })
    case BEFORE_SAVE_THEME:
      return state.map((field) => {
        return Object.assign({}, field, {
          value: field.preview
        })
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  isLoading,
  requestFailed,
  errorMessage,
  fields
})

export default rootReducer
