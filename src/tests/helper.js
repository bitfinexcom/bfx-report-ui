import React from 'react'
/* eslint-disable import/no-extraneous-dependencies */
import renderer from 'react-test-renderer'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

export function rendererCreateWithIntl(element) {
  return renderer.create(
    React.cloneElement(element),
  )
}

export default {
  rendererCreateWithIntl,
}
