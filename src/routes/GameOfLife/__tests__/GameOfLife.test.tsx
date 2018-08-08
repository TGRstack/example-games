/* eslint-disable import/no-extraneous-dependencies */

import { shallow } from 'enzyme'
import * as React from 'react'
import GameOfLife from '../GameOfLife'

describe('<GameOfLife />', () => {
  test('renders', () => {
    const wrapper = shallow(<GameOfLife />)
    expect(wrapper).toMatchSnapshot()
  })
})
