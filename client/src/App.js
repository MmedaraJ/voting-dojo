import './App.css';
import {
  BrowserRouter as Router,
  Link,
  Outlet, 
  useRoutes
} from "react-router-dom";
import Home from './views/Home';
import NewPoll from './views/NewPoll';
import Vote from './views/Vote';

function App() {
    const routes = useRoutes([
        { path: '/', element: <Home/> },
        { path: '/polls/new', element: <NewPoll/> },
        { path: '/polls/:id', element: <Vote/> }
    ]);

    return routes;
}

export default App;
