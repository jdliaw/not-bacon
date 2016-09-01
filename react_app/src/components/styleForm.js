import React, { Component } from 'react';
import VariablesSectionContainer from '../containers/variablesSectionContainer'
import ComponentsSectionContainer from '../containers/componentsSectionContainer'

export function StyleForm() {
  return (
  	<div>
      <VariablesSectionContainer />
      <ComponentsSectionContainer />
  	</div>
  )
}
