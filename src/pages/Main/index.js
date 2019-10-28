import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { FaGithub, FaPlus, FaTimes, FaEye, FaSpinner } from 'react-icons/fa';
import Select from 'react-select';
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition,
} from 'react-toasts';
import api from '../../services/api';

import Container from '../../components/Container';
import { Header, Form, SubmitButton, RepoList } from './styles';

export default function Main() {
  const [user, setUser] = useState('');
  const [repos, setRepos] = useState([]);
  const [repo, setRepo] = useState('');
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [inputError, setInputError] = useState(false);

  // update repo field by user

  // get localStorage
  useEffect(() => {
    const local = localStorage.getItem('repositories');
    if (local) {
      setRepositories(JSON.parse(local));
    }
  }, []);

  // Add localStorage
  useEffect(() => {
    localStorage.setItem('repositories', JSON.stringify(repositories));
  }, [repositories]);

  // change user input value
  function handleChangeUser(e) {
    setUser(e.target.value);
  }

  // get repos by user info on onBlur
  async function handleUser() {
    if (user.length) {
      try {
        const response = await api.get(`/users/${user}/repos`);
        const data = response.data.map(r => {
          const arr = {
            label: r.name,
            value: r.name,
          };

          return arr;
        });

        setRepos(data);
        setDisabled(false);
        setInputError(false);
      } catch (e) {
        setRepos([]);
        setInputError(true);
        setDisabled(true);
      }
    } else {
      setRepos([]);
      setDisabled(true);
    }
  }

  // Change repo input value
  function handleChangeRepo(e) {
    setRepo(e.value);
  }

  // Form action
  async function handleSubmit(e) {
    e.preventDefault();

    // Check added repositories
    const repoExists = repositories.find(r => {
      return r.name === `${user}/${repo}`;
    });

    if (repoExists) {
      return ToastsStore.error('Repository already added.', 5000);
    }

    setLoading(true);

    try {
      const response = await api.get(`/repos/${user}/${repo}`);

      const data = {
        name: response.data.full_name,
      };

      setRepositories([...repositories, data]);
      setLoading(false);
      return ToastsStore.success('Repository added', 5000);
    } catch (err) {
      setLoading(false);
      return ToastsStore.error('Invalid repository', 5000);
    }
  }

  function handleDelete(item) {
    const items = repositories.filter(r => {
      return r !== item;
    });
    setRepositories(items);
  }

  return (
    <Container>
      <Header>
        <FaGithub size={25} color="#666" />
        <h1>Respositories</h1>
      </Header>

      <Form
        onSubmit={e => {
          handleSubmit(e);
        }}
      >
        <input
          type="text"
          name="user"
          placeholder="User"
          className={inputError ? 'error' : ''}
          value={user}
          onBlur={handleUser}
          onChange={handleChangeUser}
        />

        <Select
          options={repos}
          className="select"
          classNamePrefix="select"
          placeholder="Respository"
          onChange={handleChangeRepo}
        />

        <SubmitButton spinner={loading} disabled={disabled}>
          {loading ? <FaSpinner /> : <FaPlus />}
        </SubmitButton>
      </Form>

      <RepoList>
        {repositories.map(r => (
          <li key={r.name}>
            <span>{r.name}</span>
            <Link to={`/repository/${encodeURIComponent(r.name)}`}>
              <FaEye size={14} color="#7159c1" />
            </Link>
            <FaTimes
              size={14}
              color="#7159c1"
              onClick={() => handleDelete(r)}
            />
          </li>
        ))}
      </RepoList>
      <ToastsContainer
        position={ToastsContainerPosition.TOP_RIGHT}
        store={ToastsStore}
      />
    </Container>
  );
}
