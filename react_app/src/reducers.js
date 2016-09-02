import { combineReducers } from 'redux'
import { UPDATE_PREVIEW, UPDATE_VALUE,
  CHOOSE_COLOR_SCHEME, DISPLAY_COLOR_SCHEME,
  SAVE_THEME, BEFORE_SAVE_THEME,
  REQUEST_STYLES, REQUEST_STYLES_SUCCESS, REQUEST_STYLES_FAILURE,
  SAVE_STYLES, SAVE_STYLES_SUCCESS, SAVE_STYLES_FAILURE,
  CONFIGURE_STATE
} from './actions'

/**
  STATE SHAPE:
  {
    isLoading: boolean,
    requestFailed: boolean,
    errorMessage: string,
    colorScheme: string,
    colorSchemeModule: array of strings (hex colors),
    variableFields: [
      {
        id: string,
        name: string, ('color')
        type: string, ('hex')
        preview: string,
        value: string
      },
      ...
    ]
    componentFields: [
      {
        id: string,
        name: string, (Hello Bar)
        className: string, (hello-bar)
        fields: [
          {
            id: string,
            name: string,
            type: string,
            preview: string,
            value: string
          },
          ...
        ]
      },
      ...
    ]
  }
**/

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

function colorScheme(state = "Analogous", action) {
  // type of color scheme to generate
  switch (action.type) {
    case CHOOSE_COLOR_SCHEME:
      return action.scheme
    default:
      return state
  }
}

function colorSchemeModule(state = [], action) {
  // the actual color palette generated after a color scheme is selected
  switch (action.type) {
    case DISPLAY_COLOR_SCHEME:
      state = []
      for (let [index, value] of action.colors.entries()) {
        state.push({
          id: index,
          value: value
        })
      }
      return state
    default:
      return state
  }
}

function variableFields(state = [], action) {
  // same functionality as componentFields, but just formatted differently in the state
  switch (action.type) {
    case CONFIGURE_STATE:
      return action.data.variables.map((variable) => {
        return Object.assign({}, {
          id: 'v' + action.data.variables.indexOf(variable),
          name: variable.name,
          type: variable.type, // do we need dis
          preview: variable.default,
          value: variable.default
        })
      })
    case REQUEST_STYLES_SUCCESS:
      return state.map((variable) => {
        let newValue = ''
        for (let [key, value] of Object.entries(action.response.variables)) {
          if ((key.replace(/_/g, '-')) === variable.name) {
            newValue = value
            break
          }
        }
        if (newValue !== '') {
          return Object.assign({}, variable, {
            preview: newValue,
            value: newValue
          })
        }
        return variable
      })
      case UPDATE_PREVIEW:
        if (action.componentId !== null) {
          return state
        }
        return state.map((field) => {
          if (field.id === action.id) {
            return Object.assign({}, field, {
              preview: action.preview
            })
          }
          return field
        })
      case UPDATE_VALUE:
        if (action.componentId !== null) {
          return state
        }
        return state.map((field) => {
          if (field.id === action.id) {
            return Object.assign({}, field, {
              value: action.value
            })
          }
          return field
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

// helper function to configure component fields (one level deeper)
function getFields(component, data) {
  let fieldsArray = []
  let index = 0
  for (let [key, value] of Object.entries(component.styles)) {
    if ('dependencies' in value) {
      fieldsArray.push(Object.assign({}, {
        id: 'c' + data.components.indexOf(component) + 'f' + index,
        name: key,
        type: value.type,
        preview: value.default,
        value: value.default,
        dependencies: value.dependencies
      }))
    }
    else {
      fieldsArray.push(Object.assign({}, {
        id: 'c' + data.components.indexOf(component) + 'f' + index,
        name: key,
        type: value.type,
        preview: value.default,
        value: value.default
      }))
    }
    index++
  }
  return fieldsArray
}

function componentFields(state = [], action) {
  switch(action.type) {
    case CONFIGURE_STATE:
      // configure state based on the json config
      return action.data.components.map((component) => {
        return Object.assign({}, {
          id: 'c' + action.data.components.indexOf(component), // to give each React element a unique key
          name: component.name,
          className: component.id,
          fields: getFields(component, action.data)
        })
      })
    case REQUEST_STYLES_SUCCESS:
      // get data for fields specified by the state (and config) from the API
      return state.map((component) => {
        for (let [key, value] of Object.entries(action.response)) {
          if ((key.replace(/_/g, '-')) === component.className) {
            return Object.assign({}, component, {
              fields: component.fields.map((field) => {
                let newValue = ''
                for (let [key, value] of Object.entries(action.response[key])) {
                  if ((key.replace(/_/g, '-')) === field.name) {
                    newValue = value
                    break
                  }
                }
                if (newValue !== '') {
                  return Object.assign({}, field, {
                    preview: newValue,
                    value: newValue
                  })
                } // if no value stored yet, use the default from config
                return field
              })
            })
          }
        }
        return component
      })
    case UPDATE_PREVIEW:
      // to show the preview for hex inputs
      // find the component to modify and update the preview attribute
      return state.map((component) => {
        if (component.className === action.componentId) {
          return Object.assign({}, component, {
            fields: component.fields.map((field) => {
              if (field.id === action.id) {
                return Object.assign({}, field, {
                  preview: action.preview
                })
              }
              return field
            })
          })
        }
        return component
      })
    case UPDATE_VALUE:
      // for non-hex inputs
      //find the component to modify and update the value attribute
      return state.map((component) => {
        if (component.className === action.componentId) {
          return Object.assign({}, component, {
            fields: component.fields.map((field) => {
              if (field.id === action.id) {
                return Object.assign({}, field, {
                  value: action.value
                })
              }
              return field
            })
          })
        }
        return component
      })
    case BEFORE_SAVE_THEME:
      // move values from preview to "value" field for hex inputs
      return state.map((component) => {
        return Object.assign({}, component, {
          fields: component.fields.map((field) => {
            if (field.type === 'hex') {
              return Object.assign({}, field, {
                value: field.preview
              })
            }
            return field
          })
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
  colorScheme,
  colorSchemeModule,
  variableFields,
  componentFields
})

export default rootReducer
