import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import parse from 'parse-link-header';

import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { IoMdRocket } from 'react-icons/io';

import api from '../../services/api';

import Container from '../../components/Container';

import {
  Header,
  IssuesContainer,
  Filter,
  IssuesList,
  Pagination,
  Loading,
} from './styles';

export default function Repository({ match }) {
  /**
   * State component
   */
  const [repo, setRepo] = useState('');
  const [issues, setIssues] = useState([]);
  const [issueType, setIssueType] = useState('all');
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState('');
  const [perPage, setPerPage] = useState(5);
  const [loading, setLoading] = useState(true);

  /**
   * ComponentDidAmount and ComponentDidUpdate
   */
  useEffect(() => {
    const repoName = decodeURIComponent(match.params.repository);
    async function getRepo() {
      const [getRepository, getIssues] = await Promise.all([
        api.get(`/repos/${repoName}`),
        api.get(`/repos/${repoName}/issues`, {
          params: {
            state: issueType,
            per_page: perPage,
            page,
          },
        }),
      ]);

      /**
       * Get Headers Link to setState Last Page
       */
      const headers = parse(getIssues.headers.link);

      if (headers && headers.last && headers.last !== null) {
        const totalPages = headers.last.page;
        setLastPage(totalPages);
      } else {
        setLastPage(1);
      }

      setRepo(getRepository.data);
      setIssues(getIssues.data);
      setLoading(false);
    }

    getRepo();
  }, [issueType, page, perPage]);

  /**
   * Change Issue Type
   */
  function changeIssueType(type) {
    setIssueType(type);
  }

  /**
   * Pagination Prev
   */
  function handlePagePrev() {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  /**
   * Pagination Next
   */
  async function handleNextPage() {
    if (page <= lastPage) {
      const count = (await page) + 1;
      setPage(count);
    }
  }

  /**
   * Loading Page
   */
  if (loading) {
    return (
      <Loading>
        <IoMdRocket size={35} color="#fff" />
        <strong>Carregando...</strong>
      </Loading>
    );
  }

  return (
    <Container>
      <Header>
        <Link to="/">Voltar</Link>
        <img src={repo.owner.avatar_url} alt="" />
        <h1>{repo.name}</h1>
        <p>{repo.description}</p>
      </Header>

      {issues.length ? (
        <IssuesContainer>
          <Filter>
            <div className="issue-type">
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
            </div>

            {lastPage !== 1 ? (
              <div className="per-page">
                <label>Per Page:</label>
                <select onChange={e => setPerPage(e.target.value)}>
                  <option value="5">5</option>
                  <option value="15">20</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
              </div>
            ) : (
              ''
            )}
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
              onClick={handleNextPage}
              className={page === lastPage ? 'disabled' : ''}
              disabled={page === lastPage ? 'disabled' : ''}
            >
              Next
              <FaArrowRight />
            </button>
          </Pagination>
        </IssuesContainer>
      ) : (
        <strong
          style={{ display: 'block', textAlign: 'center', color: '#999' }}
        >
          No Issues
        </strong>
      )}
    </Container>
  );
}
