import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className=" font-[Roboto] min-h-[100vh] bg-light-sky-blue ">
      <Outlet />
    </div>
  );
}

export default App;
