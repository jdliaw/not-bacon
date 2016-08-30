import React, { PropTypes } from 'react'
import ComponentModule from './componentModule'

const ComponentsSection = ({ components, updateSwatch, updateField, saveTheme, dispatch }) => (
  <div className="container">
  	<div className="row">
  		<div className="col-lg-4 col-md-6 col-sm-12">
  			<h2 className="style-type">Components</h2>
  			<h6 className="style-type-description">Customize components across your shop.</h6>
  		</div>
  	</div>

  	<div className="row style-input-row">
  		{
  			components.map((component, index) =>
  				<ComponentModule
            key={index}
  					name={component.name}
  					fields={component.fields}
            updateSwatch={(id, name, value) => updateSwatch(id, name, value, component.className)}
            updateField={(id, value) => updateField(id, value, component.className)}
            dispatch={dispatch}
  				/>
        )
  		}
  	</div>

    <div className="row">
      <div className="col-md-4 col-md-offset-8 col-sm-4 col-sm-offset-8">
        <input className="btn btn-primary" id="submit" type="submit" value="Save" onClick={saveTheme} />
      </div>
    </div>
  </div>
)

ComponentsSection.propTypes = {
  components: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  updateSwatch: PropTypes.func.isRequired,
  updateField: PropTypes.func.isRequired,
  saveTheme: PropTypes.func.isRequired
}

export default ComponentsSection
