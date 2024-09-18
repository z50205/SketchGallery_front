import React, { useState, useEffect} from "react";
import Cards from "./Cards";
import Upload from "./Upload";

const App = () => {
  const [reloadCards, setReloadCards] = useState(false);
  const triggerCardReload = () => {
    setReloadCards((prev) => !prev);
  };

  return (
    <div className="col-sm-8 offset-sm-2 p-3 border border-dark border-3 rounded-5" style={{ backgroundColor: 'rgb(202, 219, 255)' }}>
      {/* <Upload onUploadSuccess={triggerCardReload} /> */}
      <Cards key={reloadCards} />
    </div>
  );
};

export default App;
