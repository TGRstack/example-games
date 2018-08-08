import * as React from 'react'
import { ReactChildren } from '../../../../types/common'
import * as S from './Space.scss'

interface IProps {
  children: ReactChildren,
  key?: number,
}

export default function EmptySpace({children}: IProps): JSX.Element {
  return  <div className={[S.container, S.space].join(' ')}>
    {children}
  </div>
}
