import { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';

// from 'react-spinners'
import { css } from '@emotion/react';
import ClipLoader from 'react-spinners/ClipLoader';
const override = css`
  width: 150px;
  height: 150px;
  display: block;
  margin: 0 auto;
  border-color: orange;
`;

const KEY = 'b623cf494fc852caec180044c42a9501';
axios.defaults.baseURL = 'https://api.themoviedb.org';

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [error, setError] = useState(null);

  // from 'react-spinners'
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState('#2a2a2a');
  // --- --- ---- --- ----

  let history = useHistory();
  let location = useLocation();

  useEffect(() => {
    setLoading(true);
    if (location.state && location.state.searchQuery) {
      setQuery(location.state.searchQuery);

      const query = location.state.searchQuery;
      axios
        .get(`/3/search/movie?api_key=${KEY}&query=${query}`)
        .then(response => {
          setMovies(response.data.results);
        })
        .catch(error => setError(error.message))
        .finally(() => setLoading(false));
    }
  }, [location.state]);

  const handleChange = e => setQuery(e.currentTarget.value.trim());

  const handleSubmit = e => {
    e.preventDefault();
    searchMovies();

    setHistory();

    setQuery('');
  };

  const setHistory = () => {
    history.push({
      search: `query=${query}`,
      state: { searchQuery: `${query}` },
    });
  };

  const searchMovies = () => {
    return axios
      .get(`/3/search/movie?api_key=${KEY}&query=${query}`)
      .then(response => {
        setMovies(response.data.results);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" value={query} onChange={handleChange}></input>
        <button type="submit">Search</button>
      </form>

      {error && <div>We catch some error !!!</div>}

      <ul>
        {loading ? (
          // from 'react-spinners'
          <div className="sweet-loading">
            <button onClick={() => setLoading(!loading)}>Toggle Loader</button>
            <input
              value={color}
              onChange={input => setColor(input.target.value)}
              placeholder="Color of the loader"
            />

            <ClipLoader
              color={color}
              loading={loading}
              css={override}
              size={150}
            />
          </div>
        ) : (
          movies.map(movie => (
            <li key={movie.id}>
              <Link
                to={{
                  pathname: `/movies/${movie.id}`,
                  state: { from: location },
                }}
              >
                {movie.title}
              </Link>
            </li>
          ))
        )}
      </ul>
    </>
  );
}

// class MoviesPage extends Component {
//   state = {
//     movies: [],
//     query: '',
//   };

//   componentDidMount() {
//     if (this.props.location.state && this.props.location.state.searchQuery) {
//       this.setState({ query: this.props.location.state.searchQuery });

//       const query = this.props.location.state.searchQuery;
//       axios
//         .get(`/3/search/movie?api_key=${KEY}&query=${query}`)
//         .then(response => {
//           this.setState({ movies: response.data.results });
//         });
//     }
//   }

//   handleChange = e => {
//     this.setState({ query: e.currentTarget.value.trim() });
//   };

//   handleSubmit = e => {
//     e.preventDefault();
//     this.searchMovies();
//     //
//     this.setHistory();
//     //
//     this.setState({ query: '' });
//   };

//   setHistory = () => {
//     const { query } = this.state;
//     this.props.history.push({
//       search: `query=${query}`,
//       state: { searchQuery: `${query}` },
//     });
//   };

//   searchMovies = () => {
//     const { query } = this.state;
//     return axios
//       .get(`/3/search/movie?api_key=${KEY}&query=${query}`)
//       .then(response => {
//         this.setState({ movies: response.data.results });
//       });
//   };

//   render() {
//     return (
//       <>
//         <form onSubmit={this.handleSubmit}>
//           <input
//             type="text"
//             value={this.state.query}
//             onChange={this.handleChange}
//           ></input>
//           <button type="submit">Search</button>
//         </form>

//         <ul>
//           {this.state.movies.map(movie => (
//             <li key={movie.id}>
//               <Link
//                 to={{
//                   pathname: `/movies/${movie.id}`,
//                   state: { from: this.props.location },
//                 }}
//               >
//                 {movie.title}
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </>
//     );
//   }
// }
// export default MoviesPage;
