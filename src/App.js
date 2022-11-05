import './App.css';
import {
  useRoutes
} from "react-router-dom";
import routes from "./router"
import VivaSvg from "./VivaSvg"

function App() {
  const element = useRoutes(routes)

  return (
    <div className="App">
      <div className="header">
        <div className="svgWrapper">
          <VivaSvg className="vivaSvg" />
        </div>
      </div>
      {element}
    </div>
  )
}

export default App;
