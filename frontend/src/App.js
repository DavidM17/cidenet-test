import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Register from '../src/pages/RegisterPage/Register';
import View from '../src/pages/ViewPage/View';
import Navbar from '../src/components/Navbar';

function App() {
  return (
    <Router> 
      <Navbar/>
      <Switch>
          <Route path='/' exact component={View}/>
          <Route path='/registro' exact component={Register}/>
      </Switch>
    </Router>
  );
}

export default App;
