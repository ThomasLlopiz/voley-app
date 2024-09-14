import { Nav } from "./components/Nav";
import { AppRouter } from "./router/AppRouter";

function App() {
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <Nav></Nav>
      <AppRouter></AppRouter>
    </div>
  );
}

export default App;
