import './styles.scss';
import {Search} from "assets";
import axios from "axios";
import {useEffect, useState} from "react";

function Navbar({state, dispatch}) {
    const [view, setView] = useState(false);

    useEffect(() => {
        axios(`${process.env.REACT_APP_API_BASE_URL}/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${state.value}`)
            .then(response => {
                dispatch({
                    type: 'UPDATE_SEARCH_VIEW',
                    value: response.data.results
                });
            });
    }, [dispatch, state.value])

    const onSubmit = event => {
        event.preventDefault();
        setView(true);
        dispatch({
            type: 'UPDATE_VALUE', value: event.target.value.replaceAll(' ', '%20')
        });
    }

    const clickHandle = id => {
        setView(false);
        axios(`${process.env.REACT_APP_API_BASE_URL}/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}`)
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
    }

    return (<header>
        <h2>Movie Box</h2>
        <form>
            <img src={Search} alt={'search icon'}/>
            <input type={'text'} placeholder={'Search'} onKeyPress={event => event.key === 'Enter' && onSubmit(event) }/>
            <div className={'search-view'} style={!view ? { display: "none" } : { display: 'block' }}>
                { state.searchBoxView[0]?.slice(0, 5).map(item => <div key={item.id} onClick={() => clickHandle(item.id)}>
                    { item.backdrop_path !== null && <img src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`} alt={'item'} />}
                    <span>{item.title}</span>
                </div> )}
            </div>
        </form>
    </header>);
}

export default Navbar;