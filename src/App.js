import Navbar from "components/layout/navbar";
import {useEffect, useReducer, useCallback} from "react";
import Main from "components/layout/main";
import axios from "axios";

function reducer(state, action) {
    return {
        'UPDATE_VALUE': { ...state, value: action.value },
        'UPDATE_SEARCH_VIEW': { ...state, searchBoxView: [action.value] },
        'UPDATE_MOVIE_DETAILS': { ...state, movieDetails: action.value }
    }[action.type]
}

function App() {
    const [state, dispatch] = useReducer(reducer, {
        value: 'venom',
        searchBoxView: [],
        movieDetails: {
            name: '',
            date: '',
            tagline: '',
            overview: '',
            backdropPath: null,
            posterPath: null,
            language: '',
            genres: [],
            productionCompanies: [],
            voteAverage: 0
        }
    });

    const defaultMovieDetails = useCallback(
        async (id) => {
            await axios(`${process.env.REACT_APP_API_BASE_URL}/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}`)
                .then(response => {
                    dispatch({
                        type: 'UPDATE_MOVIE_DETAILS',
                        value: {
                            name: response.data.title,
                            date: response.data.release_date,
                            tagline: response.data.tagline,
                            overview: response.data.overview,
                            backdropPath: response.data.backdrop_path,
                            posterPath: response.data.poster_path,
                            language: response.data.original_language,
                            genres: response.data.genres,
                            productionCompanies: response.data.production_companies,
                            voteAverage: response.data.vote_average
                        }
                    })
                })
        },
        [dispatch],
    );

    useEffect(() => {
        defaultMovieDetails(335983); // Venom ID
    }, [dispatch, defaultMovieDetails]);

    return (
      <div className={'app'}>
          { state.movieDetails.backdropPath !== null && <img src={`https://image.tmdb.org/t/p/original${state.movieDetails.backdropPath}`} alt={'backdrop'} id={'backdrop'} /> }
          <Navbar state={state} dispatch={dispatch} />
          <Main state={state} />
      </div>
  );
}

export default App;