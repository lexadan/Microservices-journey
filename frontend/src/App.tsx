import Register from './Auth/Register';
import Login from './Auth/Login';
import Home from './Pages/Home';
import Upload from './Pages/Upload';

function App() {
  console.log(window.location.pathname)
  switch (window.location.pathname) {
    case "/login": 
      return (
        <main className="App">
          <Login />
        </main>
      );
    case "/register" : 
      return (
      <main className="App">
        <Register />
      </main>
      );
      case "/upload" : 
        return(
          <Upload/>
        );
      case "/" :
        return(
          <main>
            <Home/>
          </main>
        );
    default :
    return(
    <meta http-equiv = "refresh" content = "3; url = /" />
    );


  }

    
}

export default App;
