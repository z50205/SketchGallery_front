import React, { useState, useEffect} from "react";
import { Routes, Route } from "react-router-dom";
import Cards from "./Cards";
import Upload from "./Upload";

const App = () => {
  const [reloadCards, setReloadCards] = useState(false);
  const triggerCardReload = () => {
    setReloadCards((prev) => !prev);
  };

  return (
    <div>
      <Routes>
      <Route path="" element={
          <>
            {/* <Upload onUploadSuccess={triggerCardReload} /> */}
            <Cards key={reloadCards} />
          </>
        } />
      </Routes>
    </div>
  );
};

export default App;
