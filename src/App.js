import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./Routes/AppRoutes";
import Header from "./components/header";
import "./components/components.css";
import "./manage products/product.css";
const App = () => {
return(
  <>
  <BrowserRouter>
  <Header/>
  <AppRoutes/>
  </BrowserRouter>
  </>
);
};
export default App;
