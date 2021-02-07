import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { IoIosSearch } from "react-icons/io";
import {
  searchCourses,
  clearSearchCourses,
} from "../../redux/actions/courseActions";
import { setAlert } from "../../redux/actions/alertActions";
import ResultBox from "./ResultBox";

const Search = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (query.length < 3) {
      dispatch(clearSearchCourses());
      return;
    }
    liveSearch();
  }, [query]); // eslint-disable-line react-hooks/exhaustive-deps

  const liveSearch = () => {
    dispatch(searchCourses(query));
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (!query) {
      dispatch(setAlert("Please type into the search bar before searching"));
      return;
    }
    dispatch(searchCourses(query));
  };

  const makeQuery = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="search__wrapper">
      <form className="search__form" onSubmit={(e) => submitForm(e)}>
        <IoIosSearch className="search__icon" />
        <input
          className="search"
          type="text"
          placeholder="search"
          onChange={(e) => makeQuery(e)}
        />
      </form>
      <ResultBox />
    </div>
  );
};

export default Search;
