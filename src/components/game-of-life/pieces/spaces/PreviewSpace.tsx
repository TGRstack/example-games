import * as React from 'react'
import { ReactChildren } from '../../../../types/common'
import * as S from './Space.scss'

interface IProps {
  children: ReactChildren
}

export default function ActiveSpace({children}: IProps): JSX.Element {
  return  <div className={[S.container, S.preview].join(' ')}>
    {children}
  </div>
}
