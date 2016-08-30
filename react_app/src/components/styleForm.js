import React, { Component } from 'react';
import ColorsSectionContainer from '../containers/colorsSectionContainer';
import TypographySectionContainer from '../containers/typographySectionContainer';
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
