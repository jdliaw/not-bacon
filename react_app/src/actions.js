import fetch from 'isomorphic-fetch'
import tinycolor, { toHexString } from 'tinycolor2'

// for updating preview of color styles
export const UPDATE_PREVIEW = 'UPDATE_PREVIEW'
export const UPDATE_VALUE = 'UPDATE_VALUE'
export const CHOOSE_COLOR_SCHEME = 'CHOOSE_COLOR_SCHEME'
export const DISPLAY_COLOR_SCHEME = 'DISPLAY_COLOR_SCHEME'

// action creator for UPDATE_PREVIEW
export const updatePreview = (componentId, id, preview) => {
  return {
    type: UPDATE_PREVIEW,
    componentId,
    id,
    preview
  }
}

// action creator for UPDATE_VALUE
export const updateValue = (componentId, id, value) => {
  return {
    type: UPDATE_VALUE,
    componentId,
    id,
    value
  }
}

// action creator for CHOOSE_COLOR_SCHEME
export const chooseColorScheme = (id, scheme) => {
  return {
    type: CHOOSE_COLOR_SCHEME,
    id,
    scheme
  }
}

// on CHOOSE_COLOR_SCHEME, get colors from pleaseJS
export function getColorScheme(masterColor, scheme) {
  return (dispatch, getState) => {
    // update value shown in the select field
    dispatch(chooseColorScheme(null, scheme))
    // generate colors using base color and specified scheme
    let colors = []
    colors.length = 0
    switch (scheme.toLowerCase()) {
      case 'analogous':
        colors = tinycolor(masterColor).analogous()
        break;
      case 'monochromatic':
        colors = tinycolor(masterColor).monochromatic()
        break;
      case 'split-complementary':
        colors = tinycolor(masterColor).splitcomplement()
        break;
      case 'triad':
        colors = tinycolor(masterColor).triad()
        break;
      case 'tetrad':
        colors = tinycolor(masterColor).tetrad()
        break;
    }
    colors = colors.map((color) => {
      return color.toHexString()
    })
    // update state with colors generated
    dispatch(displayColorScheme(colors))
  }
}

// action creator to update colorSchemeModules
export const displayColorScheme = (colors) => {
  return {
    type: DISPLAY_COLOR_SCHEME,
    colors
  }
}

// for updating value to current preview value before save
export const BEFORE_SAVE_THEME = 'BEFORE_SAVE_THEME'

// action creator for BEFORE_SAVE_THEME
export const beforeSaveTheme = () => {
  return {
    type: BEFORE_SAVE_THEME
  }
}

// for when user presses the save button
export function saveTheme() {
  return (dispatch, getState) => {
    // update VALUE according to latest PREVIEW
    dispatch(beforeSaveTheme())
    // PATCH to update theme
    dispatch(updateStyles(getState().fields))
    // GET to reload state
    dispatch(fetchStyles())
  }
}

// GET requests for a publisher's styles
export const REQUEST_STYLES = 'REQUEST_STYLES'
export const REQUEST_STYLES_SUCCESS = 'REQUEST_STYLES_SUCCESS'
export const REQUEST_STYLES_FAILURE = 'REQUEST_STYLES_FAILURE'

// action creators for above 3
export function requestStyles() {
  return {
    type: REQUEST_STYLES
  }
}

export function requestStylesSuccess(response) {
  return {
    type: REQUEST_STYLES_SUCCESS,
    response
  }
}

export function requestStylesFailure(error) {
  return {
    type: REQUEST_STYLES_FAILURE,
    error
  }
}

// PATCH for publisher's styles
export const SAVE_STYLES = 'SAVE_STYLES'
export const SAVE_STYLES_SUCCESS = 'SAVE_STYLES_SUCCESS'
export const SAVE_STYLES_FAILURE = 'SAVE_STYLES_FAILURE'

// action creators for these 3
export function saveStyles(fields) {
  return {
    type: SAVE_STYLES,
    fields
  }
}

export function saveStylesSuccess() {
  return {
    type: SAVE_STYLES_SUCCESS
  }
}

export function saveStylesFailure(error) {
  return {
    type: SAVE_STYLES_FAILURE,
    error
  }
}

// action creator to configure state
export const CONFIGURE_STATE = 'CONFIGURE_STATE'

export function configureState(data) {
  return {
    type: CONFIGURE_STATE,
    data
  }
}

// ASYNC ACTION CREATORS

// first a function to check response status for errors
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error = new Error(response.status + " " + response.statusText);
    error.response = response;
    throw error;
  }
}

// function to build our JSON object how we want
function buildJSON(fields) {
  let jsonObj = Object.assign({})

  fields.map((field) => {
    Object.assign(jsonObj, {
      [field.name]: field.value
    })
  })
  return jsonObj
}


// async GET request
export function fetchStyles() {
  return (dispatch, getState) => {
    // update app state to inform that API call is starting
    dispatch(requestStyles())
    console.log('in fetchStyles')
    // console.log(getState())

    return fetch('/api/v1/styles/1')
      .then(checkStatus)
      .then(response => response.json())
      .then(json => {
        console.log('fetch response', json)
        dispatch(requestStylesSuccess(json.data.attributes["style-attributes"]))
        console.log('fetch state', getState())
      })
      .catch(e => dispatch(requestStylesFailure(e)))
  }
}

// async PATCH request
export function updateStyles(fields) {
  console.log('updateStyles')
  return (dispatch, getState) => {
    dispatch(saveStyles())
    console.log('in updateStyles')
    // console.log(getState())

    return fetch('/api/v1/styles/1', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/vnd.api+json'
      },
      body: JSON.stringify({
        "data": {
          "type": "styles",
          "id": "1",
          "attributes": {
            "style-attributes": buildJSON(fields),
            "publisher-id": "1"
          }
        }
      })
    })
      .then(checkStatus)
      .then(response => response.json())
      .then(json => {
        console.log('update response', json)
        dispatch(saveStylesSuccess())
      })
      .catch(e => dispatch(saveStylesFailure(e)))
  }
}
