import Register from './Auth/Register';
import Login from './Auth/Login';
import Home from './Pages/Home';
import Upload from './Pages/Upload';
import Cookies from 'universal-cookie';
import MyNavbar from './Pages/Navbar';

function App() {
  const cookies = new Cookies

  if (!cookies.get("token") &&  (window.location.pathname != "/register")) {
    return (
      <main>
      <Login />
    </main>
    )
  }

  switch (window.location.pathname) {
    case "/login": 
      return (
        <div className="App">
          <MyNavbar/>
          <Login />
        </div>
      );
    case "/register" : 
      return (
      <div className="App">
        <MyNavbar/>
        <Register />
      </div>
      );
      case "/upload" : 
        return(
          <div className="App">
            <MyNavbar />
            <Upload/>
          </div>
        );
      case "/" :
        return(
          <div className="App" >
            <MyNavbar/>
            <Home/>
          </div>
        );
    default :
    return(
    <meta http-equiv = "refresh" content = "3; url = /" />
    );


  }

    
}

export default App;
