import { Suspense } from "react";
import { AppProviders } from "./context";
import Routes from "./routes";

function App() {
  return (
    <AppProviders>
      <Suspense>
        <Routes />
      </Suspense>
    </AppProviders>
  );
}

export default App;
