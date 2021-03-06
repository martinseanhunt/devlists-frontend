import styled from 'styled-components'

const WidgetHeader = styled.header`
  height: ${({ fluidHeight }) => fluidHeight ? 'auto' : '75px'};
  min-height: 75px;
  border-bottom: 1px solid #EAEDF3;
  padding: 0 30px;
  display: ${({noFlex}) => noFlex ? 'block' : 'flex'};
  align-items: center;
  justify-content: space-between;

  h3 {
    padding: 0;
    margin: 0;
    color: #3e3f42;
    font-size: 1.8rem;
    font-weight: 500;
  }

  h1 {
    padding: 0;
    margin: 0;
    color: #3e3f42;
    font-size: 2.2rem;
    font-weight: 500;
  }

  .close {
    background: none;
    border: none;
  }

  p {
    color: #9ea0a5;
    line-height: 1.57;
    margin: 8px 0 0 0;
  }

  ${({ notFixed }) => notFixed && `
    height: auto;
    padding: 23px 30px;
  `}
`

export default WidgetHeader