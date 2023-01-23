import { BrowserRouter , Navigate , Routes , Route} from "react-router-dom";
import HomePage from "scenes/homePage";
//the above is used for reference the convience way to do import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline,ThemeProvider } from "@mui/material";
import {createTheme } from "@mui/material/styles"
import { themeSettings } from "./theme";
import LoginPage from "scenes/loginPage";



function App() {
  const mode = useSelector((state)=>state.mode);
  const theme = useMemo(()=>createTheme(themeSettings(mode)),[mode]);


  return (
    <div className="app">
      <BrowserRouter>
      <ThemeProvider theme={theme}>
       <CssBaseline/> {/*csss reset for material ui */}
        <Routes>
          <Route  path="/" element={<LoginPage/>}  />
          <Route  path="/home" element={<HomePage/>}  />
          <Route  path="/profile/:userId" element={<ProfilePage/>}  />
        </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
