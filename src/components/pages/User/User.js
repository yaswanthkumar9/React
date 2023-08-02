import React ,{useState,useEffect} from "react";
import "./User.css";
import Repo from "../../ui/Repo";
import site from "../../../assets/icons8-website-50.png"
import github from "../../../assets/icons8-github-32.png"
import location from "../../../assets/icons8-location-50.png"
import user from "../../../assets/icons8-user-24.png"
import { Link , useParams} from "react-router-dom";
import axios from "axios";


const User =()=>{

    const {login} = useParams();
    //User Information
    const[userInfo,setUserInfo]=useState({});
    //user Repos
    const [repos,setRepos]=useState([]);

    useEffect(()=>{
        const fetchUserInformation=async ()=>{
            try{
                const response = await Promise.all([
                    axios.get(`https://api.github.com/users/${login}`),
                    axios.get(`https://api.github.com/users/${login}/repos`),
            
            ]);
            console.log(response)
            setUserInfo(response[0].data)
            setRepos(response[1].data)
            }   
            catch(error){
            console.error(error);
        }
    };
    fetchUserInformation();
    },[login]);
    return(
        <div className="container">
            <Link to="/" className="back">Back</Link> 
           <div className="user-information">
            <div className="image">
                <img src={userInfo?.avatar_url} alt={login}/>
            </div>
            <div className="user-content">
                <h3>{userInfo?.name}</h3>
                <p>{userInfo?.bio}</p>
                <div className="more-data">
                    <p>
                        <img src={user} alt=""/>
                        {userInfo?.followers}Followers.Following{userInfo?.following}
                    </p>
                    {userInfo?.location &&(
                    <p>
                    <img src={location} alt="" />
                     {userInfo?.location}
                    </p>
                    )}
                        {userInfo?.blog&& (
                        <p>
                        <img src={site} alt=""/>
                        {userInfo?.blog}
                    </p>
                    )}
                    <p>
                        <img src={github} alt=""/>
                        <a href={userInfo?.html_url}>View Github Profile</a>
                    </p>
                </div>
            </div>
           </div>
           <div className="user-repos">
            {
                repos? repos.map(repo=>{
                    return <Repo repo={repo} key={repo.id}/>
                }) : <h2>No Repos for this user</h2>
            }
           </div>
        </div>
    );
};

export default User;