import { BrowserRouter , Navigate , Routes , Route} from "react-router-dom";
import HomePage from "scenes/homePage";
//the above is used for reference the convience way to do 
import loginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";




function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route  path="/" element={<loginPage/>}  />
          <Route  path="/home" element={<HomePage/>}  />
          <Route  path="/profile/:userId" element={<ProfilePage/>}  />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
