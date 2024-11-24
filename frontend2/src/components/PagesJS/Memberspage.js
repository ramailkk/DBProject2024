import "../StyleCSS/Memberspage.css";
import eyeImage from "../Styleicons/eye2.png";
import listImage from "../Styleicons/windows.png";
import reviewImage from "../Styleicons/review.png";
import sampleAvatar from "../Styleicons/avatar.png";
import { useState, useEffect } from "react";

function fetchMemberDetails(get_api, critera, setArray) {
  let customApi = get_api + "" + critera;
  fetch(customApi, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.data);
      setArray(data.data);
    })
    .catch((error) => console.error("Error fetching search results:", error));
}

function Memberspage() {
  const [members, setMembers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [membersPerPage] = useState(14); // Members per page

  useEffect(() => {
    fetchMemberDetails("http://localhost:3001/api/members", "", setMembers);
  }, []);

  // Calculate the indices for the current page's members
  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  const currentMembers = members.slice(indexOfFirstMember, indexOfLastMember);

  // Function to change the page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const memberlist = currentMembers.map((item) => (
    <div key={item[0]}>
      <div className="members-page__element">
        <img src={sampleAvatar} className="members-page-profile multiple-member-picture" alt="Avatar" />
        <div className="members-page-profile multiple-member-name">
          <span>{item[1]}</span>
        </div>
        <div className="members-page-profile multiple-member-watchedcount">
          <div className="members-page-profile-flex__image">
            <img src={eyeImage} alt="Eye" />
          </div>
          <div className="members-page-profile-flex__content">{item[2]}</div>
        </div>

        <div className="members-page-profile mutliple-member-listcount">
          <div className="members-page-profile-flex__image">
            <img src={listImage} alt="List" />
          </div>
          <div className="members-page-profile-flex__content">{item[3]}</div>
        </div>

        <div className="members-page-profile multiple-member-reviewcount">
          <div className="members-page-profile-flex__image">
            <img src={reviewImage} alt="Review" />
          </div>
          <div className="members-page-profile-flex__content">{item[4]}</div>
        </div>
      </div>
      <hr className="members-page-profile-linebreak" />
    </div>
  ));

  // Calculate total pages
  const totalPages = Math.ceil(members.length / membersPerPage);

  return (
    <div>
      <div className="members-page-container">
        {/* Table Header */}
        <div className="members-page__element member-heading-element">
          <div className="members-page-profile member-empty-heading members-page-columns"></div>
          <div className="members-page-profile multiple-member-name members-page-columns">
            <span>Name</span>
          </div>
          <div className="members-page-profile multiple-member-watchedcount members-page-columns">
            <span>Films</span>
          </div>
          <div className="members-page-profile mutliple-member-listcount members-page-columns">
            <span>Lists</span>
          </div>
          <div className="members-page-profile multiple-member-reviewcount members-page-columns">
            <span>Reviews</span>
          </div>
        </div>
        <hr className="members-page-profile-linebreak" />

        {/* Display the members */}
        {memberlist}

        {/* Pagination Controls */}
        <div className="pagination">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={currentPage === index + 1 ? "active" : ""}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Memberspage;
