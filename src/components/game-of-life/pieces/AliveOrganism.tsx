import * as React from 'react'
import LivingOrganism from './organisms/LivingOrganism'
import ActiveSpace from './spaces/ActiveSpace'

export default function GameOfLIfePieces_Alive(): JSX.Element {
  return  <ActiveSpace>
    <LivingOrganism />
  </ActiveSpace>
}
