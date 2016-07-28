import { combineReducers } from 'redux'
import { UPDATE_PREVIEW,
  REQUEST_STYLES, REQUEST_STYLES_SUCCESS, REQUEST_STYLES_FAILURE,
  SAVE_STYLES, SAVE_STYLES_SUCCESS, SAVE_STYLES_FAILURE
} from './actions'

const initialState = [
    {
      id: 0,
      name: 'gray-base',
      preview: '#000',
      value: '#000'
    },
    {
      id: 1,
      name: 'gray-darker',
      preview: '#373a3c',
      value: '#373a3c'
    },
    {
      id: 2,
      name: 'gray-dark',
      preview: '#55595c',
      value: '#55595c'
    },
    {
      id: 3,
      name: 'gray',
      preview: '#818a91',
      value: '#818a91'
    },
    {
      id: 4,
      name: 'gray-light',
      preview: '#eceeef',
      value: '#eceeef'
    },
    {
      id: 5,
      name: 'gray-lighter',
      preview: '#f7f7f9',
      value: '#f7f7f9'
    },
    {
      id: 6,
      name: 'brand-primary',
      preview: '#0275d8',
      value: '#0275d8'
    },
    {
      id: 7,
      name: 'brand-success',
      preview: '#5cb85c',
      value: '#5cb85c'
    },
    {
      id: 8,
      name: 'brand-info',
      preview: '#5bc0de',
      value: '#5bc0de'
    },
    {
      id: 9,
      name: 'brand-warning',
      preview: '#f0ad4e',
      value: '#f0ad4e'
    },
    {
      id: 10,
      name: 'brand-danger',
      preview: '#d9534f',
      value: '#d9534f'
    }
]


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
      // debugger
      return action.response.map((field) => {
        if (action.response.length > state.length) {
          // new field
          return Object.assign({}, {
            id: parseInt(field.id),
            name: field.name,
            preview: field.value,
            value: field.value
          })
        }
        return Object.assign({}, field, {
          preview: field.preview,
          value: field.value
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
