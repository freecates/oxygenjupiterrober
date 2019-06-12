import styled from 'styled-components'

const MenuTitle = styled.div`
  margin: 0 auto;
  text-align: center;
  max-width: 44rem;
  color: ${props => props.theme.mediumBrown};
  h1 {
    line-height: 4.5rem;
    font-size: 3rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin: 0;
  }
  h1:hover {
    cursor: pointer;
  }
  h1.black {
    margin: 1.5rem 0;
    color: ${props => props.theme.black};
  }
  @media (max-width: 480px) {
    h2 {
      font-size: 1.5rem;
      line-height: 2.7rem;
    }
  }
`

export default MenuTitle
