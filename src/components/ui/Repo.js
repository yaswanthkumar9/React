import React from "react";

const Repo =(repo)=>{
    const{name,html_url,description,language}=repo;
    console.log(repo.repo.name);
    return(
        <div className="repo">
            <h3>
                <a href = {repo.repo.html_url} target="_blank">{repo.repo.name}</a>
            </h3>
            <p>
                {repo.repo.description}
            </p>
            {language && <small>Written in{repo.repo.language}</small>}
        </div> 
       
    )
};
export  default Repo;