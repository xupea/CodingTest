import "./App.css";
import PageAll from "./pages/bugAll";
import PageHistory from "./pages/bugHistory";

function App() {
  return (
    <div className="App">
      <PageAll />
      <div className="chart-container">
        <PageHistory />
      </div>
    </div>
  );
}

export default App;
