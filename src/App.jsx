import Header from "./components/Header";
import "./App.css";
import AddingTasks from "./components/AddingTasks";

function App() {
  return (
    <div className="flex flex-col items-center justify-center mt-6">
      <Header />
      <AddingTasks />
    </div>
  );
}

export default App;
