import './App.css';
//import Home from './Pages/home';
import LocationUpdater from './Location Fetching/LocationUpdater';
import LocationList from './Location Fetching/LocationList';
function App() {
  return (
    <div className="App">
       <LocationUpdater />
       <LocationList />
    </div>
  );
}

export default App;
