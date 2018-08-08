import * as React from 'react'
import LivingOrganism from '../organisms/LivingOrganism'
import SeedOrganism from '../organisms/SeedOrganism'
import ActiveSpace from './ActiveSpace'
import EmptySpace from './EmptySpace'
import PreviewSpace from './PreviewSpace'

export default function GameOfLIfePiecesDemo_Spaces(): JSX.Element {
  return  <div>
    <h4>Empty Space</h4>
    <EmptySpace />
    <h4>Active Space</h4>
    <ActiveSpace><LivingOrganism /></ActiveSpace>
    <h4>Preview Space</h4>
    <PreviewSpace><SeedOrganism /></PreviewSpace>
  </div>
}
