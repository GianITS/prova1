import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EmpDetail from "./components/EmpDetail";
import EmpEdit from "./components/EmpEdit";
import EmpCreate from "./components/EmpCreate";
import EmpListing from "./components/EmpListing";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EmpListing />}></Route>
          <Route path="/tasks/create" element={<EmpCreate />}></Route>
          <Route path="/tasks/detail/:taskid" element={<EmpDetail />}></Route>
          <Route path="/tasks/edit/:taskid" element={<EmpEdit />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
