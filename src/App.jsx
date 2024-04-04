import reduxLogo from "./assets/redux_white.svg";
import "./App.css";
import UsersList from "./components/UsersList";
import ProductList from "./components/ProductList";

function App() {
  return (
    <>
      <div>
        <a href="https://redux-toolkit.js.org/" target="_blank">
          <img
            src={reduxLogo}
            className="logo react"
            alt="Redux toolkit logo"
          />
        </a>
      </div>
      <h1>Redux toolkit</h1>
      <UsersList />
      <ProductList />
    </>
  );
}

export default App;
