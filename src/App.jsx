import { Nav } from "./components/Nav";
import { AppRouter } from "./router/AppRouter";

function App() {
  return (
    <div className="flex flex-col">
      <Nav></Nav>
      <AppRouter></AppRouter>
    </div>
  );
}

export default App;
