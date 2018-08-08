import * as React from 'react'
import * as S from './Organism.scss'

export default function Organism(): JSX.Element {
  return  <div className={[S.container, S.organism].join(' ')}>
    🧐
  </div>
}
