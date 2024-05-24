import MyAppBar from './components/Appbar';
import {Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import EditUser from './pages/EditUser';
import FindUser from './pages/FindUser';
import EditCity from './pages/EditCity';
import FindCity from './pages/FindCity';
import EditSight from './pages/EditSight';
import FindSight from './pages/FindSight';


function App() {
  return (
    <div className="App">
        <MyAppBar/>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/edit-user" element={<EditUser />} />
            <Route path="/find-user" element={<FindUser />} />
            <Route path="/edit-city" element={<EditCity />} />
            <Route path="/find-city" element={<FindCity />} />
            <Route path="/edit-sight" element={<EditSight />} />
            <Route path="/find-sight" element={<FindSight />} />
        </Routes>
    </div>
  );
}


export default App;
