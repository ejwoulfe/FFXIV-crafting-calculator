
import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navigation from './components/navigation/navigation';
import { ServerContext } from './context/ServerContext';
import DisciplesRecipeList from './routes/disciple-recipes-list/disciple-recipes.list';
import Home from './routes/home/home';

function App() {

  const [server, setServer] = useState<string>(localStorage.getItem("homeServer") as string);


  useEffect(() => {

    localStorage.setItem("homeServer", server);
  }, [server])

  return (
    <BrowserRouter>
      <div id="app">

        <ServerContext.Provider value={{ server, setServer }}>
          <Navigation />
          <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/disciple/:disciple/recipes" element={<DisciplesRecipeList />} />


          </Routes>
        </ServerContext.Provider>

      </div >
    </BrowserRouter>
  );
}

export default App;
