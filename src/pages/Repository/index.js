import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import parse from 'parse-link-header';

import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';

import api from '../../services/api';

import Container from '../../components/Container';
import { Header, IssuesList, Filter, Pagination } from './styles';

export default function Repository({ match }) {
  const repoName = decodeURIComponent(match.params.repository);
  const [repo, setRepo] = useState('');
  const [issues, setIssues] = useState([]);
  const [issueType, setIssueType] = useState('all');
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState('');

  useEffect(() => {
    async function getRepo() {
      const [getRepository, getIssues] = await Promise.all([
        api.get(`/repos/${repoName}`),
        api.get(`/repos/${repoName}/issues`, {
          params: {
            state: issueType,
            per_page: 5,
            page,
          },
        }),
      ]);

      const dataRepo = {
        login: getRepository.data.owner.login,
        avatar: getRepository.data.owner.avatar_url,
        name: getRepository.data.name,
        issues: getRepository.data.open_issues_count,
      };

      const parseHeader = parse(getIssues.headers.link);
      if (parseHeader) {
        setLastPage(parseHeader);
      } else {
        setLastPage(1);
      }

      setRepo(dataRepo);
      setIssues(getIssues.data);
    }
    getRepo();
  }, [issueType, page]);

  function changeIssueType(type) {
    setIssueType(type);
  }

  function handlePagePrev() {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  function handlePageNext() {
    if (page !== lastPage) {
      setPage(page + 1);
    }
  }

  return (
    <Container>
      <Header>
        <Link to="/">Voltar</Link>
        <img src={repo.avatar} alt="" />
        <h1>{repo.name}</h1>
      </Header>

      <Filter>
        <button
          type="button"
          onClick={() => changeIssueType('all')}
          className={issueType === 'all' ? 'active' : ''}
        >
          All
        </button>
        <button
          type="button"
          onClick={() => changeIssueType('open')}
          className={issueType === 'open' ? 'active' : ''}
        >
          Open
        </button>
        <button
          type="button"
          onClick={() => changeIssueType('closed')}
          className={issueType === 'closed' ? 'active' : ''}
        >
          Closed
        </button>
      </Filter>

      <IssuesList>
        {issues.map(issue => (
          <li key={issue.id}>
            <img src={issue.user.avatar_url} alt={issue.user.login} />
            <div>
              <a href={issue.html_url}>
                {issue.title}
                {issue.labels.map(label => (
                  <span key={label.id}>{label.name}</span>
                ))}
              </a>
              <small>{issue.user.login}</small>
            </div>
          </li>
        ))}
      </IssuesList>

      <Pagination>
        <button
          type="button"
          onClick={handlePagePrev}
          className={page === 1 ? 'disabled' : ''}
          disabled={page === 1 ? 1 : 0}
        >
          <FaArrowLeft />
          Prev
        </button>

        <button
          type="button"
          onClick={handlePageNext}
          className={page === lastPage ? 'disabled' : ''}
          disabled={page === lastPage ? 1 : 0}
        >
          Next
          <FaArrowRight />
        </button>
      </Pagination>
    </Container>
  );
}
