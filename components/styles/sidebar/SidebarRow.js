import styled from 'styled-components'

const SidebarRow = styled.div`
  border-top: 1px solid #eaedf3;
  padding: 25px 0;

  &:first-of-type {
    padding-top: 10px;
    border-top: none;
  }

  h4 {
    margin: 0;
    line-height: 1.5;
    font-size: 1.6rem;
    font-weight: 500;
    color: #3e3f42; 
    text-transform: none;
  }

  label {
    text-transform: uppercase;
    color: #9ea0a5;
    font-weight: 500;
    margin-bottom: 10px;
  }

  p {
    line-height: 1.57;
    color: #6b6c6f;
    margin-top: 5px;
  }
`

export default SidebarRow