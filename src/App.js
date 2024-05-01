import "./App.css";
import BarChart from "./charts/BarChart";
import ScatterPlot from "./charts/ScatterPlot";

function App() {
  const divStyles = {
    margin: "25px auto",
    border: "1px solid grey",
    padding: "25px",
    display: "inline",
  };
  return (
    <div className="App">
      <div style={divStyles}>
        <BarChart />
      </div>
      <div style={divStyles}>
        <ScatterPlot />
      </div>
    </div>
  );
}

export default App;
