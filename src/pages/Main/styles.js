import styled, { keyframes, css } from 'styled-components';

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 25px;

  h1 {
    color: #333;
  }

  svg {
    margin-right: 10px;
  }
`;

export const Form = styled.form`
  display: flex;
  max-width: 100%;
  flex-direction: row;
  margin-bottom: 25px;

  input {
    width: 150px;
    padding: 10px;
    border: 1px solid #eee;
    border-radius: 4px;
    font-size: 16px;
    margin-right: 10px;

    &.error {
      border-color: red;
    }
  }

  .select {
    flex: 1;
    margin-right: 10px;

    &__control {
      border: 1px solid #eee;
      padding: 2px;
      font-size: 16px;
    }
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg)
  }
  to {
    transform: rotate(360deg)
  }
`;

export const SubmitButton = styled.button.attrs(props => ({
  disabled: props.disabled,
}))`
  display: flex;
  align-items: center;
  padding: 10px 15px;
  background-color: #7159c1;
  border: 0;
  border-radius: 4px;
  color: #fff;
  transition: all 0.5s;

  &:hover {
    opacity: 0.8;
  }

  &[disabled] {
    opacity: 0.5;
  }

  ${props =>
    props.spinner &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;

export const RepoList = styled.ul`
  list-style: none;
  padding: 0;

  li {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px 0;

    & + li {
      border-top: 1px solid #eee;
    }

    span {
      flex: 1;
    }

    a {
      display: flex;
      align-items: center;
      margin-right: 10px;
    }

    svg {
      cursor: pointer;
    }
  }
`;
