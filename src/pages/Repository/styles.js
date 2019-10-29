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

  h1 {
    margin-bottom: 10px;
  }
`;

export const IssuesContainer = styled.div`
  &.hide {
    display: none;
  }
`;

export const Filter = styled.div`
  position: relative;
  display: flex;
  justify-content: space-around;
  margin: 20px auto;

  button {
    width: 70px;
    padding: 5px;
    margin: 0 5px;
    background-color: #fff;
    border: 1px solid #eee;
    color: #222;
    font-weight: 60px;
    border-radius: 4px;
    box-shadow: 1px 1px 1px #ddd;
    transition: all 0.2s;

    &.active {
      color: #fff;
      background-color: #7159c1;
      border-color: #7159c1;
    }
  }

  > div {
    display: flex;
    align-items: center;

    label {
      margin-right: 5px;
    }
  }

  .issue-type {
    justify-content: center;
  }

  .per-page {
    position: absolute;
    right: 0;
    top: 5px;
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

export const Loading = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: #7159c1;
  font-size: 20px;
  color: #fff;

  svg {
    margin-bottom: 10px;
  }
`;
