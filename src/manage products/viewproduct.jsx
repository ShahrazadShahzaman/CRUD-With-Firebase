import { getDocs,collection,deleteDoc,doc,onSnapshot } from "firebase/firestore";
import {db} from "../firebase/config";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer,toast } from "react-toastify";

const ViewProduct=()=>{

    const [viewproduct,setViewProduct] = useState([]);
    const navigate = useNavigate();

    const handleEdit=(item)=>{
     navigate(`/createproduct/${item.id}`
    )};
   
const getProductData = async (e) =>{
    try {
        const res = await getDocs (collection(db, 'product'))
        const product = res.docs.map((doc)=>{
            return({
                id: doc.id,
                ...doc.data()
            })
        })
        setViewProduct(product);
    }catch(error){
        console.log(error);
    }
}

useEffect(()=>{
    getProductData();
},[])
const handleDelete = async (id) =>{
    try{
        await deleteDoc(doc(db,"product",id));
        setViewProduct(viewproduct.filter((product)=>product.id !==id));
        toast.success("Product Deleted Successfully!")
    }catch (error){
        console.log(error);
        toast.error("Error Deleting Product")
    }
};
    return(
<>
<div className="product">
 <h2 className="data">Product List</h2>
 <button className="ANP-btn" onClick={()=> navigate ("/createproduct")}> Add New Product</button>
 <table>
    <thead>
        <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Actions</th>
        </tr>
    </thead>
    <tbody>
        {viewproduct && viewproduct.map((item, index) => {
            return(
                <tr key={index}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.description}</td>
                <td>
                    <button className="actionbtn edit"  onClick={()=>handleEdit(item)}>Edit</button>
                    <button className="actionbtn del" onClick={()=>handleDelete(item.id)}>Delete</button> 
                </td>
                </tr>
            );
        })
        }
    </tbody>
 </table>
</div>
<ToastContainer/>
 </>
    );
};
export default ViewProduct;