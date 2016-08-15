import React, { Component, PropTypes } from 'react';

const ColorSchemeModule = ({ colors }) => {
  return (
    <div className="btn-toolbar col-md-4 col-sm-6 col-xs-12" role="toolbar">
      {
        colors.map(color =>
          <div className="btn-group" role="group" key={color.id}>
            <button type="button" className="btn btn-default" key={color.id} style={{background: color.value, color: color.value}}>$</button>
          </div>
        )
      }
    </div>
  )
}
ColorSchemeModule.propTypes = {
  colors: PropTypes.array.isRequired
}

export default ColorSchemeModule
