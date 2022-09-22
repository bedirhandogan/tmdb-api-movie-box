import './styles.scss';
import {Close, Search} from "assets";

function Navbar({state, dispatch}) {
    const onChange = event => {
        dispatch({
            type: 'UPDATE_VALUE',
            value: event.target.value
        })
    }

    return (
        <header>
            <h2>Movie Box</h2>
            <div>
                <img src={Search} alt={'search icon'} />
                <input type={'text'} value={state.value} placeholder={'Search'} onChange={event => onChange(event)} />
                <img src={Close} alt={'close icon'} onClick={() => dispatch({ type: 'UPDATE_VALUE', value: '' })} />
            </div>
        </header>
    );
}

export default Navbar;