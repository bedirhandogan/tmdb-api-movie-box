import Navbar from "components/layout/navbar";
import {useReducer} from "react";

function reducer(state, action) {
    switch (action.type) {
        case 'UPDATE_VALUE':
            return { value: action.value }
        default:
            throw new Error();
    }
}

function App() {
    const [state, dispatch] = useReducer(reducer, {
        value: ''
    });

    return (
      <>
          <Navbar state={state} dispatch={dispatch} />
      </>
  );
}

export default App;