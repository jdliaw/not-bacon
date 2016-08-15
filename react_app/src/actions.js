import fetch from 'isomorphic-fetch'
import Please, { HEX_to_HSV } from 'pleasejs'

// for updating preview of color styles
export const UPDATE_PREVIEW = 'UPDATE_PREVIEW'
export const UPDATE_VALUE = 'UPDATE_VALUE'
export const CHOOSE_COLOR_SCHEME = 'CHOOSE_COLOR_SCHEME'
export const DISPLAY_COLOR_SCHEME = 'DISPLAY_COLOR_SCHEME'

// action creator for UPDATE_PREVIEW
export const updatePreview = (id, preview) => {
  return {
    type: UPDATE_PREVIEW,
    id,
    preview
  }
}

// action creator for UPDATE_VALUE
export const updateValue = (id, value) => {
  return {
    type: UPDATE_VALUE,
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
    var baseColor = HEX_to_HSV(masterColor)
    var colors = Please.make_scheme(baseColor, {
      scheme_type: scheme,
      format: 'hex'
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


// attempt to convert to saga
// export function* fetchStyles() {
//   try {
//     const response = yield call('/api/v1/styles/1')
//     yield call(checkStatus(response))
//     yield put({ type: REQUEST_STYLES_SUCCESS, response })
//   }
//   catch (e) {
//     yield put({ type: REQUEST_STYLES_FAILURE, error })
//   }
// }

// // convert PATCH to saga
// export function* updateStyles(fields) {
//   try {
//     yield call('/api/v1/styles/1', {

//     })
//     yield call(checkStatus)
//     yield put({ type: SAVE_STYLES_SUCCESS })
//   }
//   catch (e) {
//     yield put({ type: SAVE_STYLES_FAILURE, error })
//   }
// }


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
