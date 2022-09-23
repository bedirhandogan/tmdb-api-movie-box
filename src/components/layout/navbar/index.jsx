import './styles.scss';
import {Close, Search} from "assets";

function Navbar({state, dispatch}) {
    const onChange = event => {
        console.log(event.target.value)
        dispatch({
            type: 'UPDATE_VALUE',
            value: event.target.value
        })
    }
    return (
        <header>
            <h2>Movie Box</h2>
            <form>
                <img src={Search} alt={'search icon'} />
                <input type={'text'} value={state.value} placeholder={'Search'} onChange={event => onChange(event)} />
                <img src={Close} alt={'close icon'} onClick={() => dispatch({ type: 'UPDATE_VALUE', value: '' })} style={state.value === '' ? {
                    display: 'none'
                }: { display: 'block' }}/>
            </form>
        </header>
    );
}

export default Navbar;