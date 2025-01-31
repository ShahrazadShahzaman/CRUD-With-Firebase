import { useEffect, useState} from "react";
import { db } from "../firebase/config";
import { ToastContainer,toast } from "react-toastify";
import { collection , doc ,addDoc ,getDoc, updateDoc } from "firebase/firestore";
import { useLocation, useNavigate } from "react-router-dom";

const Createproduct =()=>{
    const [product,setProduct]=useState({
        name:'',
        price:'',
        description:''
    });
const [loading,setLoading]=useState(false);
const navigate =useNavigate();
const location=useLocation();
const productId=location.pathname.split('/')[2];

useEffect(()=>{
    if (productId){
        const fetchproduct = async () => {
        const productRef = doc(db, "product" ,productId);
        const docSnap = await getDoc(productRef);
    if(docSnap.exists()){
        setProduct(docSnap.data());
    }else{
        toast.error("product not found")
        navigate ("/viewproduct");
    }
    };
    fetchproduct();
}
}, [productId]);
const handleSubmit=async(e)=>{
    e.preventDefault();
    setLoading(true);
try{
    if (productId){
    const productRef = doc (db, "product" ,productId);
    await updateDoc(productRef,{
     name:product.name,
     price:product.price,
     description:product.description
    });
    toast.success("Product Updated Successfully!")
    }
    else{
    await addDoc(collection(db, 'product'),{
        name:product.name,
        price:product.price,
        description:product.description,
    });
    setProduct({ name: '', price: '', description: ''});
    toast.success("Product Added Successfully");
}
}catch(error){
    toast.error("Error Adding Product");
}finally{
    setLoading(false);
}
};
const handleChange=(e)=>{
const {name,value}=e.target;
setProduct((prevProduct)=>({
    ...prevProduct,
    [name]:value
}));
};
return(
    <>
    <div className="product">
        <h2 className="create data">Create Data</h2>
           <form className="formdata" onSubmit={handleSubmit}> 
             {/* { msg && (<h2>{msg}</h2>)} */}
            <div className="form-group">
                <label>Name</label>
                <input className="texts" type="text" name="name" placeholder="Enter The Product Name" value={product.name} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>Price</label>
                <input className="texts" type="text" name="price"  placeholder="Enter The Price" value={product.price} onChange={handleChange}/>
            </div>
            <div className="form-group">
                <label>Description</label>
                <input className="texts"  type="text" name="description"  placeholder="Enter The Description" value={product.description} onChange={handleChange}/>
            </div>
            <div>
                <button className="submitbtn" type="submit" disabled={loading}>
                    {loading ? 'Loading...' : 'Submit'}
                </button>
            </div>
        </form>
        <ToastContainer/>
    </div>
    </>
);
};
export default Createproduct;