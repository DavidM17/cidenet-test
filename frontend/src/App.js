import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Register from '../src/pages/RegisterPage/Register';
import Navbar from '../src/components/Navbar';

function App() {
  return (
    <Router> 
      <Navbar/>
      <Switch>
          <Route path='/' exact component={Register}/>
          <Route path='/empleados' exact component={Register}/>
      </Switch>
    </Router>
  );
}

export default App;
