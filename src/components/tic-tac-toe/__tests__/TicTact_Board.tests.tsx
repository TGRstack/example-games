import { shallow } from 'enzyme'
import * as React from 'react'

import Board from '../TicTac_Board'

describe('<TicTacToe />', () => {
  describe('Renders', () => {
    it('Succesfully', () => {
      const wrapper = shallow(<Board />)
      expect(wrapper).toMatchSnapshot()
    })
    describe('<Header />', () => {
      // it('displays current player', () => false)
      // it('displays new game button when game is over', () => false)
      // it('score of player1 vs player2', () => false)
    })
    describe('<Overlay />', () => {
      // it('overlay with winning player announce', () => false)
      // it('overlay with no-winner announce', () => false)
    })
  })
})
