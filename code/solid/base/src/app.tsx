import { Router } from "@solidjs/router";
import { AppProviders } from "./context";
import Routes from "./routes";

function App() {
  return (
    <AppProviders>
      <Router>
        <Routes />
      </Router>
    </AppProviders>
  );
}

export default App;
