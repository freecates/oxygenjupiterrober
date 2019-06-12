import React from 'react'
import Robot from './Robot'

const VECTOR_MOVIMENT = {
  S: [0, -1],
  O: [-1, 0],
  N: [0, 1],
  E: [1, 0]
}

const GIRAR_JUPITER_ESQUERRA = {
  N: 'O',
  O: 'S',
  S: 'E',
  E: 'N'
}

const GIRAR_JUPITER_DRETA = {
  N: 'E',
  E: 'S',
  S: 'O',
  O: 'N'
}

class Jupiter extends React.Component {
  initialState = {
    start: null,
    end: null,
    ops: [],
    position: '0-0',
    encarat: 'N',
    path: null,
    error: null
  }

  state = Object.assign({}, this.initialState)

  componentDidMount() {
    this.reset(() => {
      this.process(this.props)
    })
  }

  componentWillReceiveProps(nextProps) {
    this.reset(() => {
      this.process(nextProps)
    })
  }

  reset = cb => {
    this.setState(this.initialState, cb)
  }

  process = props => {
    const { commands, position } = props
    if (commands === '') {
      this.setState(this.initialState)
    } else {
      const parts = position.split(' ')
      this.setState(
        {
          start: parts[0] + '-' + parts[1],
          position: parts[0] + '-' + parts[1],
          encarat: parts[2]
        },
        () => {
          if (props.execute) {
            this.execute(commands)
          }
        }
      )
    }
  }

  execute = commands => {
    let ops = (commands || '').split('')
    this.setState({ ops }, () => {
      setTimeout(this.run.bind(this), 500)
    })
  }

  run = () => {
    let ops = this.state.ops.slice()
    let { position, path, encarat } = this.state
    path = path || {}
    path[position] = encarat
    let op = ops.shift()
    let newPosition = {}
    if (op === 'I') {
      newPosition = this.turnExplorerLeft()
    } else if (op === 'D') {
      newPosition = this.turnExplorerRight()
    } else if (op === 'M') {
      newPosition = this.moveExplorerForward()
    } else {
      console.log('Instrucció incorrecta')
    }
    if (newPosition.error) {
      alert("No puc moure'm més enllà dels límits del planeta Júpiter")
    }
    this.setState(
      Object.assign(this.state, {
        ops,
        path,
        ...newPosition
      }),
      () => {
        if (this.state.ops.length > 0 && !this.state.error) {
          setTimeout(this.run.bind(this), 300)
        } else {
          this.setState({
            end: this.state.position
          })
        }
      }
    )
  }

  moveExplorerForward = () => {
    const { size } = this.props
    const { position, encarat } = this.state
    const moveVector = VECTOR_MOVIMENT[encarat]
    const pos = position.split('-').map(Number)
    const x = pos[0] + moveVector[0]
    const y = pos[1] + moveVector[1]
    if (x < 0 || x >= size || y < 0 || y >= size) {
      return { error: true }
    }
    return {
      position: x + '-' + y
    }
  }

  turnExplorerLeft = () => {
    const { encarat } = this.state
    return {
      encarat: GIRAR_JUPITER_ESQUERRA[encarat]
    }
  }

  turnExplorerRight = () => {
    const { encarat } = this.state
    return {
      encarat: GIRAR_JUPITER_DRETA[encarat]
    }
  }

  render() {
    const { size } = this.props
    let { position, encarat, path } = this.state
    path = path || {}
    let cells = []
    for (let i = size - 1; i >= 0; i--) {
      for (let j = 0; j < size; j++) {
        cells.push(j + '-' + i)
      }
    }
    return (
      <ul className="jupiter">
        {cells.map(cell => {
          let explorerElm = null
          let explorerPath = null
          let cellStatus = ''

          if (this.state.error && this.state.end === cell) {
            cellStatus = 'error'
          }
          if (this.state.start === cell) {
            cellStatus += ' start'
          }
          if (this.state.end === cell) {
            cellStatus += ' end'
          }

          if (position === cell) {
            explorerElm = <Robot encarat={encarat} />
          } else {
            explorerPath = path[cell] ? (
              <Robot encarat={path[cell]} rastre={true} />
            ) : null
          }

          return (
            <li
              className={`cell ${!!path[cell] ? 'path' : ''} ${cellStatus}`}
              key={cell}
            >
              <label>{cell}</label>
              {explorerElm || explorerPath}
            </li>
          )
        })}
      </ul>
    )
  }
}

export default Jupiter
