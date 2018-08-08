import * as React from 'react'
import * as S from './legend.scss'
import { Demo as OrganismsDemo } from './pieces/organisms'
import { Demo as SpacesDemo } from './pieces/spaces'

export default function GameOfLifeLegend(): JSX.Element {
  return  <div className={S.container}>
    <h2>Pieces Demo</h2>
    <div className={S.section}>
      <article>
      <h3>Organisms</h3>
      <OrganismsDemo />
    </article>
    </div>
    <div className={S.section}>
      <article>
      <h3>Spaces</h3>
      <SpacesDemo />
    </article>
    </div>
  </div>
}
