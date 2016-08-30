import React, { Component, PropTypes } from 'react';
import { updatePreview } from '../actions';

const TextInput = ({id, name, preview, value, updateSwatch, colors}) => {
  let style = {
    background: preview,
    color: preview
  };

  let divID = name + "-div";
  let inputID = name + "-input"

  return (
    <div className="style-input-div" id={divID}>
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
                        style={{background: color.value, color: color.value, borderRadius: '0.25rem'}}
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
