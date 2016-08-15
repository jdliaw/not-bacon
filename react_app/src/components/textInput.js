import React, { Component, PropTypes } from 'react';
import { updatePreview } from '../actions';

const TextInput = ({id, name, preview, value, updateSwatch, colors}) => {
  var style = {
    background: preview,
    color: preview
  };

  var divID = name + "-div";
  var inputID = name + "-input"

  return (
    <div className="style-input-div col-md-4 col-sm-6 col-xs-12" id={divID}>
      <label id={name}>
        {name}
      </label>
      <div className="input-group">
        <input className="form-control style-input"
               id={inputID}
               type="text"
               placeholder={preview}
               onBlur={e => updateSwatch(id, name, e.target.value)}
        />
        <div className="input-group-btn">
          <button type="button"
                  className="btn btn-default dropdown-toggle"
                  id="input-preview"
                  style={style}
                  data-toggle="dropdown"
                  aria-haspopup="true" aria-expanded="false">@
            <span className="caret"></span>
          </button>
          <ul className="dropdown-menu">
            {
              colors.map(color =>
                <button className="dropdown-item"
                        type="button"
                        key={color.id}
                        style={{background: color.value, color: color.value}}
                        onClick={e => updateSwatch(id, name, color.value)}
                >@</button>
              )
            }
          </ul>
        </div>
      </div>
    </div>
  )
}

TextInput.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  preview: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  updateSwatch: PropTypes.func.isRequired,
  colors: PropTypes.array.isRequired
}

export default TextInput
