import routerEvents from 'next-router-events'
import Rodal from 'rodal'
import styled from 'styled-components'
import RodalStyles from './styles/RodalStyles'
import MenuTitle from './styles/MenuTitle.js'
import ImportMDFile from './importMDFile'

const RodalItem = styled.div`
  .rodal-dialog {
    border: none !important;
    box-shadow: none !important;
    width: 90vw !important;
    margin: 0;
    padding: 1em;
    top: 25vh;
    left: 5vw;
    height: 70vh !important;
    position: absolute;
    @media (min-width: 1300px) {
      width: 70vw !important;
      left: 15vw;
      top: 15vh;
      padding: 2em;
    }
  }

  .rodal-close {
    top: 16vh;
    position: fixed;
    cursor: pointer;
    right: 16vw;
    @media (max-aspect-ratio: 5/8) {
      top: 26vh;
      right: 8vw;
    }
    @media (max-aspect-ratio: 6/8) {
      top: 26vh;
      right: 8vw;
    }
    @media (max-aspect-ratio: 8/6) {
      top: 26vh;
      right: 8vw;
    }
  }
  .rodal-content {
    max-width: 90rem;
    margin: 0 auto;
  }
  .center {
    text-align: center;
    p {
      margin: 0;
    }

    h1 {
      margin: 0;
      text-align: center;
      font-size: 4.5rem;
      line-height: 6.1rem;
      text-transform: uppercase;
      color: ${props => props.theme.black};
      @media (max-width: 480px) {
        font-size: 2.8rem;
        line-height: 3.8rem;
      }
    }
    div.center {
      margin: 10px auto;
      width: 60%;
      height: 100px;
      position: relative;
      text-align: center;
    }
    div.center div.medium {
      height: 50px;
    }
    div.center div.here:after {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 50%;
      border-left: 1px solid ${props => props.theme.black};
      transform: translate(-50%);
    }
  }
  .left {
    text-align: left;
  }
`
const customStyles = {
  margin: 0,
  backgroundColor: '#ffffff',
  overflowY: 'auto'
}

const AlignLeftMenutitle = styled(MenuTitle)`
  text-align: left;
  max-width: 90rem;
`

class SingleModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: 0,
      singleModalItems: this.props.singleModalItems
    }
    this.hide = this.hide.bind(this)
    routerEvents.on('routeChangeStart', this.hide)
  }

  show(evt) {
    this.setState({ visible: evt.target.getAttribute('id') })
  }

  hide() {
    this.setState({ visible: false })
  }

  render() {
    const noOKsingleModalItems = this.state.singleModalItems
    const singleModalItems = [...noOKsingleModalItems]
    return (
      <React.Fragment>
        {singleModalItems
          .filter(singleModalItem => singleModalItem.class == 'left')
          .map(singleModalItem => (
            <RodalStyles key={singleModalItem.id}>
              {singleModalItem.items ? (
                <React.Fragment>
                  <a
                    style={{ cursor: 'pointer' }}
                    onClick={this.show.bind(this)}
                    title={singleModalItem.name}
                    id={singleModalItem.id}
                    className="single-modal-item-name"
                  >
                    {singleModalItem.name}
                  </a>
                  <RodalItem className={singleModalItem.class}>
                    <Rodal
                      visible={this.state.visible == singleModalItem.id}
                      onClose={this.hide.bind(this)}
                      animation="zoom"
                      duration={1000}
                      className="rodal-item"
                      showMask={true}
                      customStyles={customStyles}
                      closeOnEsc={true}
                      id={singleModalItem.id}
                    >
                      {singleModalItem.items.map((item, id) => (
                        <React.Fragment>
                          <AlignLeftMenutitle key={id}>
                            <h1 className="black" title={item.name}>
                              {item.name}
                            </h1>
                          </AlignLeftMenutitle>
                          <section className="rodal-content">
                            <div className={item.class}>
                              <ImportMDFile file={item.file} />
                            </div>
                          </section>
                        </React.Fragment>
                      ))}
                    </Rodal>
                  </RodalItem>
                </React.Fragment>
              ) : (
                ''
              )}
            </RodalStyles>
          ))}
      </React.Fragment>
    )
  }
}

export default SingleModal
