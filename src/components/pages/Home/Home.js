import React, { useState, useEffect } from "react";
import "./Home.css";
import axios from "../../../axios";
import User from "../../ui/User";

const Home = () => {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const handleQueryInput = (e) => {
    const value = e.target.value;
    setQuery(value);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => {
      if (prevPage === 1) return prevPage;
      else return prevPage - 1;
    });
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePageLimit = (e) => {
    const value = e.target.value;
    setLimit(parseInt(value));
  };

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get("/search/users", {
        params: {
          q: query,
          page: page,
          per_page: limit,
        },
      });
      return data.items;
    } catch (error) {
      console.error(error);
      return null;
    }  
  };
  

  const handleSearchUsers = async (e) => {
    e.preventDefault();
    if (query.trim()) {
      const items = await fetchUsers();
      setUsers(items);
    } else {
      console.log("Your query is empty");
    }
  };

  useEffect(() => {
    const displayUserOnChange = async () => {
      if (query) {
        const items = await fetchUsers();
        setUsers(items);
      }
    };
    displayUserOnChange();
  },[query, page, limit]);

  return (
    <div className="container">
      <div className="search-form">
        <h2>Search GitHub User</h2>
        <form>
          <input value={query} onChange={handleQueryInput} type="text" />
          <button onClick={handleSearchUsers}>Search</button>
        </form>
      </div>
      <div className="search-results">
        <div className="more-options">
          <label>
            <small>Per Page</small>
            <select onChange={handlePageLimit}>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </label>
          <div className="pagination">
            <button onClick={handlePrevPage}>{page}</button>
            <button onClick={handleNextPage}>{page + 1}</button>
          </div>
        </div>
        {users && users.length ? (
          users.map((user) => <User user={user} key={user.id} />)
        ) : (
          <h2>There is nothing to display....</h2>
        )}
      </div>
    </div>
  );
};

export default Home;
