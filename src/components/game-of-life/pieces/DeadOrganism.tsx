import * as React from 'react'
import DeadOrganism from './organisms/DeadOrganism'
import EmptySpace from './spaces/EmptySpace'

export default function GameOfLIfePiecesDead(): JSX.Element {
  return  <EmptySpace>
    <DeadOrganism />
  </EmptySpace>
}
