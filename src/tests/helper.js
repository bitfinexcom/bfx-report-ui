import React from 'react'
import ReactDOM from 'react-dom'
/* eslint-disable import/no-extraneous-dependencies */
import renderer from 'react-test-renderer'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
/* eslint-enable import/no-extraneous-dependencies */
import { addLocaleData, IntlProvider } from 'react-intl'
import locale from 'locales/en-US'

configure({ adapter: new Adapter() })

addLocaleData(locale.data)

// Create the IntlProvider to retrieve context for wrapping around.
const intlProvider = new IntlProvider({
  locale: locale.locale,
  messages: locale.messages,
}, {})
const { intl } = intlProvider.getChildContext()

// refer from https://github.com/yahoo/react-intl/wiki/Testing-with-React-Intl
export function renderWithIntl(element, root) {
  /* eslint-disable-next-line react/no-render-return-value */
  const instance = ReactDOM.render(
    <IntlProvider locale={locale.locale} messages={locale.messages}>
      {React.cloneElement(element)}
    </IntlProvider>,
    root,
  )

  return instance
}

export function rendererCreateWithIntl(element) {
  const instance = renderer.create(
    <IntlProvider locale={locale.locale} messages={locale.messages}>
      {React.cloneElement(element)}
    </IntlProvider>,
  )

  return instance
}

// refer from https://github.com/yahoo/react-intl/wiki/Testing-with-React-Intl#enzyme
export function shallowWithIntl(element, { context, ...additionalOptions } = {}) {
  return shallow(
    React.cloneElement(element, { intl }),
    {
      context: Object.assign({}, context, { intl }),
      ...additionalOptions,
    },
  )
}
