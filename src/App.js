import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import CustomerList from "./components/CustomerList";
import TrainingsList from "./components/TrainingsList";

function App() {
  return (
    <BrowserRouter>
      <>
        <Link to="/">Customers</Link>
        <Link to="/trainings">Trainings</Link>
      </>
      <Routes>
        <Route path="/" element={<CustomerList />} />
        <Route path="trainings" element={<TrainingsList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
