import * as React from 'react'
// import * as SC from '../../../helpers/center.scss';
import DeadOrganism from './DeadOrganism'
import LivingOrganism from './LivingOrganism'
import Organism from './Organism'
import SeedOrganism from './SeedOrganism'

export default function GameOfLIfePiecesDemo_Organisms(): JSX.Element {
  return  <div>
    <h4>Basic Organism</h4>
    <Organism />
    <h4>Seed Organism</h4>
    <SeedOrganism />
    <h4>Living Organism</h4>
    <LivingOrganism />
    <h4>Dead Organism</h4>
    <DeadOrganism />
  </div>
}
