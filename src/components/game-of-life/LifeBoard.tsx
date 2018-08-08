import * as React from 'react'

interface IProps {
  label: string,
}

interface IState {
}

export default class LifeBoard extends React.Component<IProps, IState> {
  static defaultProps = {
    label: 'text',
  }

  constructor(props: IProps) {
    super(props)

    this.state = {}
  }

  render() {
    return <div>

    </div>
  }
}
