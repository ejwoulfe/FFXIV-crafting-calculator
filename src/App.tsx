
import { useState, useEffect } from 'react';
import Navigation from './components/navigation/navigation';
import { ServerContext } from './context/ServerContext';
import Home from './routes/home/home';

function App() {

  const [server, setServer] = useState<string>(localStorage.getItem("homeServer") as string);


  useEffect(() => {

    localStorage.setItem("homeServer", server);
  }, [server])

  return (
    <div id="app">
      <ServerContext.Provider value={{ server, setServer }}>
        <Navigation />
        <Home />
      </ServerContext.Provider>

    </div >
  );
}

export default App;
