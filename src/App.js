import logo from "./logo.svg";
import "./App.css";
import Iban from "./components/Iban";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Head from "./components/Head";
function App() {
  return (
    <>
      <Head />
      <Iban />
    </>
  );
}

export default App;
