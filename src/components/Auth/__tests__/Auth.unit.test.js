import React from 'react'
import ReactDOM from 'react-dom'
import {
  renderWithIntl,
  rendererCreateWithIntl,
} from 'tests/helper'

import Auth from '../Auth'

test('renders without crashing while hidden', () => {
  const div = document.createElement('div')
  renderWithIntl(<Auth />, div)
  ReactDOM.unmountComponentAtNode(div)
})

test('renders without crashing', () => {
  const div = document.createElement('div')
  renderWithIntl(<Auth authStatus isShown />, div)
  ReactDOM.unmountComponentAtNode(div)
})

test('render correctly while hidden', () => {
  const component = rendererCreateWithIntl(<Auth />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('render correctly', () => {
  const component = rendererCreateWithIntl(<Auth authStatus isShown />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
