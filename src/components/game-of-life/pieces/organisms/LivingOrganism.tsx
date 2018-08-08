import * as React from 'react'
import * as S from './Organism.scss'

export default function LivingOrganism(): JSX.Element {
  return  <div className={[S.container, S.alive].join(' ')}>
    😹
  </div>
}
