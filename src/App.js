import Navbar from "components/layout/navbar";
import {useReducer} from "react";
import Main from "components/layout/main";

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
            name: 'Venom',
            date: '2018-09-28',
            tagline: 'The world has enough Superheroes.',
            overview: 'Investigative journalist Eddie Brock attempts a comeback following a scandal, but accidentally becomes the host of Venom, a violent, super powerful alien symbiote. Soon, he must rely on his newfound powers to protect the world from a shadowy organization looking for a symbiote of their own.',
            backdropPath: '/VuukZLgaCrho2Ar8Scl9HtV3yD.jpg',
            posterPath: '/2uNW4WbgBXL25BAbXGLnLqX71Sw.jpg',
            language: 'en',
            genres: [
                { id: 878, name: "Science Fiction" },
                { id: 28, name: "Action" }
            ],
            productionCompanies: [
                { id: 7505, name: "Marvel Entertainment" },
                { id: 53462, name: "Matt Tolmach Productions" },
                { id: 81620, name: "Tencent Pictures" },
                { id: 84041, name: "Pascal Pictures" },
                { id: 166230, name: "Avi Arad Productions" }
            ],
            voteAverage: 6.8
        }
    });

    return (
      <div className={'app'}>
          { state.movieDetails.backdropPath !== null && <img src={`https://image.tmdb.org/t/p/original${state.movieDetails.backdropPath}`} alt={'backdrop'} id={'backdrop'} /> }
          <Navbar state={state} dispatch={dispatch} />
          <Main state={state} />
      </div>
  );
}

export default App;