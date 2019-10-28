import styled from 'styled-components';

export const Header = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;

  a {
    margin-bottom: 20px;
  }

  img {
    width: 120px;
    border-radius: 50%;
    margin-bottom: 10px;
    border: 1px solid #eee;
  }
`;

export const Filter = styled.div`
  display: flex;
  justify-content: space-around;
  max-width: 50%;
  margin: 20px auto;

  button {
    padding: 5px 10px;
    background-color: #7159c1;
    border: 0;
    color: #fff;
    border-radius: 4px;
    transition: all 0.2s;

    &.active {
      background-color: #434343;
    }
  }
`;

export const IssuesList = styled.ul`
  li {
    display: flex;
    align-items: center;
    border: 1px solid #eee;
    padding: 10px;
    border-radius: 4px;

    & + li {
      margin-top: 10px;
    }

    img {
      width: 30px;
      border-radius: 50%;
      margin-right: 10px;
      border: 1px solid #eee;
    }

    > div {
      flex: 1;

      a {
        display: block;
        color: #333;
        font-weight: bold;
        margin-bottom: 5px;
        text-decoration: none;

        &:hover {
          color: #7159c1;
        }

        span {
          font-size: 12px;
          background-color: #eee;
          border-radius: 4px;
          padding: 2px 5px;
          margin-left: 10px;
        }
      }

      small {
        color: #666;
      }
    }
  }
`;

export const Pagination = styled.div`
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
