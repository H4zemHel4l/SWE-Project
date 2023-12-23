import {Route, Routes, BrowserRouter} from "react-router-dom";
import Navbar from "./components/Navbar";
import Mid from "./components/Mid";
import Footer from "./components/Footer";
import All from "./pages/All";
import Desc from "./components/Desc";
import Other from "./pages/Other";
import Tech from "./pages/Tech";
import Science from "./pages/Science";
import Selfgrowth from "./pages/Selfgrowth";
import Profile from "./pages/Profile";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Edit from "./components/Edit";

function App() {
    return (
        <div>
            <BrowserRouter>
                <Navbar/>
                <Routes>
                    <Route path={'/'} element={<Mid/>}/>
                    <Route path={'/all'} element={<All/>}/>
                    <Route path={'/tech'} element={<Tech/>}/>
                    <Route path={'/profile'} element={<Profile/>}/>
                    <Route path={'/signin'} element={<Signin/>}/>
                    <Route path={'/signup'} element={<Signup/>}/>
                    <Route path={'/science'} element={<Science/>}/>
                    <Route path={'/selfgrowth'} element={<Selfgrowth/>}/>
                    <Route path={'/others'} element={<Other/>}/>
                    <Route path={'/desc/:id'} element={<Desc/>}/>
                    <Route path={'/edit/:id'} element={<Edit/>}/>
                </Routes>
                <Footer/>
            </BrowserRouter>
        </div>
    );
}

export default App;
