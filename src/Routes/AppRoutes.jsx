import { Route,Routes } from "react-router-dom";
import Home from '../components/home';
import About from '../components/about';
import ViewProduct from "../manage products/viewproduct";
import Createproduct from "../manage products/createproduct";

const AppRoutes=()=>{
    return(
<Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="about" element={<About/>}/>
    <Route path="viewproduct" element={<ViewProduct/>}/>
    <Route path="createproduct" element={<Createproduct/>}/>
    <Route path="createproduct/:productId" element={<Createproduct/>}/>
</Routes>
    );
};
export default AppRoutes;