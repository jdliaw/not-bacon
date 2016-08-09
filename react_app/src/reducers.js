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
      if (Object.keys(action.response).length > state.length){
        let nextState = []
        for (let [key, value] of Object.entries(action.response)) {
          nextState.push({
            id: Object.keys(action.response).indexOf(key),
            name: key.replace(/_/g, '-'),
            preview: value,
            value: value
          })
        }
        return nextState
      }
      return state.map((existingField) => {
        let existingKey = existingField.name
        let newValue = ''
        for (let [key, value] of Object.entries(action.response)) {
          if ((key.replace(/_/g, '-')) === existingKey) {
            newValue = value
            break
          }
        }
        return Object.assign({}, existingField, {
          preview: newValue,
          value: newValue
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
