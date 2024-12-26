import { FilterList } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import Allquestions from "./Allquestions";
import "./CSS/Main.css";
import { useContext } from "react";
import { SearchContext } from "../../context/searchcontext";

function Main() {
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const [sortBy, setSortBy] = useState("newest");
  const [limit, setLimit] = useState(5);
  const filterRef = useRef(null);
  const [search, setSearch] = useState("");
  const location = useLocation();
  const { shouldRefresh, setShouldRefresh } = useContext(SearchContext);

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
    setCurrentPage(1);
    setShowDropdown(false);
    console.log("Limit changed to:", newLimit);
  };

  console.log("Component State:", {
    currentPage,
    totalPages,
    totalQuestions,
    isLoading,
  });



  const fetchQuestions = useCallback(async () => {
    console.log("Fetching questions for page:", currentPage, "search:", search);
    setIsLoading(true);
    try {
      const response = await axios.get("/api/question", {
        params: {
          page: currentPage,
          limit: limit,
          sort: sortBy,
          search: search,
        },
      });

      console.log("API Response:", response.data);

      if (response.data) {
        console.log(
          "Setting questions:",
          response.data.questions?.length || 0,
          "items"
        );
        setQuestions(response.data.questions || []);
        setTotalPages(response.data.totalPages || 0);
        setTotalQuestions(response.data.totalQuestions || 0);
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
      console.log("Error details:", error.response?.data);
      setQuestions([]);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, sortBy, limit, search]);

  useEffect(() => {
    console.log("useEffect triggered, fetching questions...");
    fetchQuestions();
  }, [fetchQuestions]);

  const paginate = (pageNumber) => {
    console.log("Pagination requested:", { from: currentPage, to: pageNumber });
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  const handleSort = (sortType) => {
    setSortBy(sortType);
    setCurrentPage(1);
  };
  const getSortDisplayText = (sortType) => {
    switch (sortType) {
      case "likes":
        return "Most Liked Questions";
      case "answers":
        return "Most Answered Questions";
      default:
        return "Latest Questions";
    }
  };
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get("search");
    if (searchQuery) {
      setSearch(searchQuery);
      setCurrentPage(1); // Reset page to 1 when search changes
    } else {
      setSearch("");
    }

    console.log("Search query changed:", searchQuery);
    // Trigger fetch when search changes
    fetchQuestions();

    return () => {
      // Cleanup function
      setQuestions([]);
      setCurrentPage(1);
    };
  }, [location.search, fetchQuestions]);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    const handleScroll = () => {
      if (showDropdown) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [showDropdown]);

 
  
  useEffect(() => {
    if (shouldRefresh) {
      fetchQuestions();
      setShouldRefresh(false);
    }
  }, [shouldRefresh, fetchQuestions, setShouldRefresh]);

  return (
    <div className="main">
      <div className="main-container">
        <div className="main-top">
          <h2>All Questions</h2>
          <Link to="/add-question">
            <button>Ask Question</button>
          </Link>
        </div>
        <div className="main-dec">
          <p>
            {getSortDisplayText(sortBy)}
            <sub style={{ color: "gray", fontSize: "0.85em" }}>
              (out of {totalQuestions})
            </sub>
          </p>

          <div className="main-filter">
            <div className="filter-container">
              <div
                className="main-filter-item"
                ref={filterRef}
                onClick={toggleDropdown}
              >
                <FilterList />
                <p>Filter</p>
                <div
                  className={`filter-dropdown ${showDropdown ? "show" : ""}`}
                >
                  <div className="sortby">
                    <ul>
                      <li onClick={() => handleSort("newest")}>Newest</li>
                      <li onClick={() => handleSort("likes")}>Most Liked</li>
                      <li onClick={() => handleSort("answers")}>
                        Most Answered
                      </li>
                    </ul>
                  </div>
                  <div className="limit-options">
                    <button
                      className={limit === 5 ? "active" : ""}
                      onClick={() => handleLimitChange(5)}
                    >
                      5
                    </button>
                    <button
                      className={limit === 10 ? "active" : ""}
                      onClick={() => handleLimitChange(10)}
                    >
                      10
                    </button>
                    <button
                      className={limit === 15 ? "active" : ""}
                      onClick={() => handleLimitChange(15)}
                    >
                      15
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="questions">
          {isLoading ? (
            <div className="loading">Loading...</div>
          ) : (
            questions.map((question) => (
              <div key={question._id} className="question">
                <Allquestions question={question} />
              </div>
            ))
          )}
        </div>
        <div className="pagination">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx + 1}
              onClick={() => paginate(idx + 1)}
              className={currentPage === idx + 1 ? "active" : ""}
            >
              {idx + 1}
            </button>
          ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Main;
