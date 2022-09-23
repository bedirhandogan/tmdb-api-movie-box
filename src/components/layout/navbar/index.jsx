import './styles.scss';
import {Close, Search} from "assets";

function Navbar({dispatch}) {
    return (
        <header>
            <h2>Movie Box</h2>
            <form>
                <img src={Search} alt={'search icon'} />
                <input type={'text'}  placeholder={'Search'} />
                <img src={Close} alt={'close icon'} onClick={() => dispatch({ type: 'UPDATE_VALUE', value: '' })} />
            </form>
        </header>
    );
}

export default Navbar;