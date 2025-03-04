import { useState } from "react"
import { Link ,useNavigate } from "react-router-dom";

const Login = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState("");
    let nevigate = useNavigate();
    const HandleSubmit = async(e)=>{
        e.preventDefault()

        const newUser = {email,password}
        const response = await fetch('/api/loginuser',{
            method:'POST',
            body: JSON.stringify(newUser),
            headers:{
                'Content-Type':'application/json'
            }
        })

        const json = await response.json();
        if(!response.ok){
            setError(json.error)
        }
        if(response.ok){
            setError(null)
            setEmail('');
            setPassword('');
            localStorage.setItem('authToken',json.authToken);
            localStorage.setItem('authEmail',email);
            nevigate('/')
        }
    }
    return <>
        <nav className="navbar navbar-expand-lg navbar-dark ">
            <div className="container-fluid">
                <Link className="navbar-brand fs-4 fst-italic bg-white text-success btn" to="/">GoodFood</Link>
                <Link className="navbar-brand fs-4 ">LogIn Page</Link>
                <Link className="btn bg-white text-success mx-1" to="/signup">SignUp</Link>
            </div>
        </nav>

        <div className="container">
            
            <form onSubmit={HandleSubmit}>
                
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="text" className="form-control" id="exampleInputEmail1"  value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                </div>
                
                <button type="submit" className="btn btn-primary" >Submit</button>
                <Link to='/signup' className="m-3 btn btn-primary">Create an account</Link>
                
            </form>
            {
                error!=""
                ?<div className="text-danger mt-3 btn border-danger w-100 fs-5">
                    {error}
                </div>
                :""    
            }
        </div>
    </>
    
}
export default Login