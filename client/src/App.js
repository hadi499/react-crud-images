import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Navbar from "./components/layouts/Navbar";
import AddPost from "./components/pages/AddPost";
import EditPost from "./components/pages/EditPost";
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/add">
            <AddPost />
          </Route>
          <Route path="/update/:id">{(props) => <EditPost {...props} />}</Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
