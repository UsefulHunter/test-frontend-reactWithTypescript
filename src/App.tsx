import React from 'react';
import { useState } from 'react';
import './App.css';

interface InitialStateProps {
  errors: string[];
  results: any[];
}

const App: React.FC = () => {
  return (
    <div className="App">
      <Search />
    </div>
  );
};

const useSearch = () => {
  const [state, setState] = useState({
    errors: [],
    results: []
  } as InitialStateProps);
  const search = async (input: string) => {
    try {
      const data = await fetch(
        `https://api.github.com/users/${input}/repos`
      ).then(res => res.json());
      setState({ results: data, errors: [] });
    } catch (error) {
      setState({ errors: [error], results: [] });
    }
  };

  return { errors: state.errors, results: state.results, search };
};

const Search: React.FC = () => {
  const [input, setInput] = useState('');
  const { search, results } = useSearch();
  return (
    <div className="Content">
      <form
        className="form"
        onSubmit={e => {
          e.preventDefault();
          search(input);
        }}
      >
        <input
          className="form__input"
          onChange={e => setInput(e.target.value)}
          placeholder="Enter github username"
          value={input}
        />
        <button className="form__submit" type="submit">
          Search
        </button>
      </form>
      <ul className="Repositories">
        {results.map((r: any) => (
          <li key={r.id}>
            <a className="Links" href={r.svn_url}>
              {r.name}
            </a>
            <span>{r.language}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
