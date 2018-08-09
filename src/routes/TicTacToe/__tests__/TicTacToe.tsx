/* eslint-disable import/no-extraneous-dependencies */

import { shallow } from 'enzyme'
import * as React from 'react'
import TicTacToe from '../TicTacToe'

describe('<TicTacToe />', () => {
  test('renders', () => {
    const wrapper = shallow(<TicTacToe />)
    expect(wrapper).toMatchSnapshot()
  })
})
