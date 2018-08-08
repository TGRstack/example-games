import * as React from 'react'
import * as S from './Organism.scss'

export default function DeadOrganism(): JSX.Element {
  return  <div className={[S.container, S.dead].join(' ')}>
    💀
  </div>
}
