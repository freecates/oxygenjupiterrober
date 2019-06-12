import React, { useState, useRef } from 'react'
import styled, { ThemeProvider, injectGlobal } from 'styled-components'
import Jupiter from './Jupiter'

const theme = {
  black: '#000000',
  green: '#2191bd',
  mediumGreen: '#10445a',
  lightGreen: '#accbda',
  darkGreen: '#07212c',
  white: '#FFFFFF',
  maxWidth: '80rem'
}

const StyledMainapp = styled.div`
  width: 100%;

  .app {
    max-width: ${props => props.theme.maxWidth};
    margin: 2em auto;
  }

  .align-right {
    text-align: right;
  }

  .control-panel {
    position: relative;
    background-color: ${props => props.theme.white};
    color: ${props => props.theme.lightGreen};
    margin: 2em 0;
    padding: 10px;
    text-align: left;
    input[type='text'] {
      border: 0;
      padding: 0.5em;
      background-color: ${props => props.theme.lightGreen};
      color: ${props => props.theme.mediumGreen};
      letter-spacing: 2pt;
      width: 50%;
      text-align: right;
      font-size: 1em;
    }
    button {
      background-color: ${props => props.theme.mediumGreen};
      color: ${props => props.theme.white};
      border-radius: 2px;
      border: 1px solid ${props => props.theme.mediumGreen};
      padding: 0.5em;
      font-size: 1em;
      transition-duration: 0.4s;
    }
    button:hover {
      cursor: pointer;
      background: ${props => props.theme.darkGreen};
    }
    button.cta {
      background-color: ${props => props.theme.green};
      color: ${props => props.theme.white};
      font-size: 1em;
    }
    button.cta:hover {
      background-color: ${props => props.theme.white};
      color: ${props => props.theme.green};
      border: 1px solid ${props => props.theme.green};
      font-size: 1em;
    }

    .start-position input {
      margin-left: 10px;
      font-size: 1em;
    }
    .commands {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-column-gap: 20px;
      margin-top: 20px;
    }

    .execution {
      display: grid;
      grid-template-columns: 0.5fr 0.75fr 3fr 1fr;
      grid-column-gap: 10px;
      margin-top: 20px;
      align-items: center;
    }
    .execution input[type='text'] {
      width: 100%;
    }

    .exemples {
      display: flex;
      margin-top: 10px;
      align-items: center;
    }

    .exemples ul {
      margin-left: 20px;
    }

    .exemples ul li {
      display: inline;
      margin-right: 10px;
    }

    .exemples ul li:after {
      content: ',';
      display: inline-block;
    }

    .exemples ul li:last-child:after {
      display: none;
    }
  }

  .robot {
    font-size: 3rem;
    transition: all 0.1s;
    color: #fafafa;
    z-index: 1;
  }

  .robot.S {
    transform: rotate(180deg);
  }

  .robot.O {
    transform: rotate(270deg);
  }

  .robot.N {
    transform: rotate(0deg);
  }

  .robot.E {
    transform: rotate(90deg);
  }

  .robot.rastre {
    opacity: 0.5;
  }

  .jupiter {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-column-gap: 1px;
    grid-row-gap: 1px;
    list-style: none;
    max-width: 350px;
    margin: 40px auto;
    padding: 0;
  }
  .cell {
    position: relative;
    display: grid;
    align-items: center;
    justify-items: center;
    background-color: ${props => props.theme.mediumGreen};
    transition: background 0.2s;
    min-height: 70px;
  }
  @media (min-width: 510px) {
    .jupiter {
      max-width: 525px;
    }
    .cell {
      min-height: 105px;
    }
  }

  .cell label {
    position: absolute;
    top: 7px;
    left: 7px;
    color: #ffffff;
    font-size: 1rem;
  }

  .cell.path:before {
    position: absolute;
    display: block;
    content: '';
    width: 100%;
    height: 100%;
    background-color: #accbda;
    animation: zoomIn 0.2s;
    z-index: 0;
  }

  .cell.path label {
    color: #fff;
  }

  .cell.end:before {
    display: none;
  }

  .cell.end {
    background-color: #e76557;
  }

  .cell.error {
    background-color: #f44336;
  }

  .cell.end label,
  .cell.error label {
    opacity: 1;
  }
`

injectGlobal`
@import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
html {
  box-sizing:border-box;
  font-size:10px;
  line-height:10px;
}
*, *:before, *:after {
  box-sizing:inherit;
}
body {
  padding:0;
  font-size: 1.9rem;
  margin: 0;
  line-height:2.5rem;
  letter-spacing:.25rem;
  font-family: 'Roboto', sans-serif;
  font-weight: normal;
  font-kerning: normal;
  text-rendering:optimizeLegibility;
}
h1, h2, h3, h4, strong {
  font-family: 'Roboto';
  font-weight: bold;
}`

export default function Mainapp() {
  const [state, setState] = useState({
    commands: '',
    commandsToExecute: '',
    execute: false,
    startPosition: '00N'
  })
  function addCommand(e) {
    setState({ commands: state.commands + e.target.value })
  }
  function runSample(e) {
    setState({ commands: e.target.value })
  }

  function execute() {
    let startPosition = startInput.value
    if (/^[0-4][0-4][NEOS]$/.test(startPosition)) {
      setState({
        execute: true,
        commandsToExecute: state.commands,
        startPosition
      })
    } else {
      alert('Posició inicial incorrecta.')
    }
  }

  function clear() {
    setState({
      commands: '',
      execute: false,
      commandsToExecute: ''
    })
  }

  function validateStartPosition(e) {
    e.target.checkValidity()
  }

  function stopExecute() {
    setState({
      execute: false
    })
  }
  let startInput = useRef('')
  let position = state.startPosition || '00N'
  position = position.split('').join(' ')
  return (
    <ThemeProvider theme={theme}>
      <StyledMainapp>
        <main className="app">
          <section className={`control-panel`}>
            <div className={`start-position`}>
              <label htmlFor="startPosition">Posició inicial (ex. 00N):</label>
              <input
                type="text"
                id="startPosition"
                maxLength={3}
                required
                pattern={'^[0-4][0-4][NEOS]$'}
                defaultValue={'00N'}
                onBlur={validateStartPosition}
                ref={elm => {
                  startInput = elm
                }}
              />
            </div>
            <div className="commands">
              <button value="M" onClick={addCommand}>
                Mou
              </button>
              <button value="I" onClick={addCommand}>
                Esquerra
              </button>
              <button value="D" onClick={addCommand}>
                Dreta
              </button>
            </div>

            <div className="execution">
              <button onClick={clear} className="secondary">
                ✖
              </button>
              <label htmlFor="ordre" className="align-right">
                Ordre
              </label>
              <input
                type="text"
                id="ordre"
                readOnly
                value={state.commands || ''}
              />
              <button className={'cta'} onClick={execute}>
                Executar
              </button>
            </div>

            <div className="exemples">
              <label>Exemple: </label>
              <ul>
                <li>
                  <button value={'MMDMMIMMDM'} onClick={runSample}>
                    MMDMMIMMDM
                  </button>
                </li>
                <li>
                  <button value={'DMMMIMDMIM'} onClick={runSample}>
                    DMMMIMDMIM
                  </button>
                </li>
              </ul>
            </div>
          </section>
          <Jupiter
            size={5}
            position={position}
            commands={state.commandsToExecute}
            execute={state.execute}
            onDone={stopExecute}
          />
        </main>
      </StyledMainapp>
    </ThemeProvider>
  )
}
