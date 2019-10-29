import styled from 'styled-components';

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;

  button {
    display: flex;
    align-items: center;
    background-color: #7159c1;
    color: #fff;
    padding: 10px;
    border-radius: 4px;
    border: 0;

    &.disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    svg {
      margin-right: 10px;
    }

    & + button {
      svg {
        margin-left: 10px;
        margin-right: 0;
      }
    }
  }
`;
