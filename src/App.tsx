import { useState } from 'react';
import Navigation from './components/navigation/navigation';
import { ServerContext } from './context/ServerContext';
import Home from './routes/home/home';

function App() {

  const [server, setServer] = useState<string>("No Server Selected")

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
