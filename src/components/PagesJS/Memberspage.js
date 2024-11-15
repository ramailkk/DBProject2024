import "../StyleCSS/Memberspage.css";
import eyeImage from "../Styleicons/eye2.png"
import listImage from "../Styleicons/windows.png"
import reviewImage from "../Styleicons/review.png"
import sampleAvatar from "../Styleicons/avatar.png"
// const template = { name: "name", picture: 0, watched: 321, lists: 412, reviews:853 };

// const members = Array.from({ length: 30 }, () => ({ ...template }));
// how the result array should come out to be 

const template = {
    name: "",
    picture: "",
    watched: 0,
    lists: 0,
    reviews: 0
};

// Helper functions to generate random data
const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomName = () => {
    const firstNames = ["Alice", "Bob", "Charlie", "Dana", "Eve", "Frank", "Grace", "Hank"];
    const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Martinez"];
    return `${firstNames[getRandomNumber(0, firstNames.length - 1)]} ${lastNames[getRandomNumber(0, lastNames.length - 1)]}`;
};

const members = Array.from({ length: 30 }, () => ({
    ...template,
    name: getRandomName(),
    picture: "",  // Picture as a random number (could represent an ID)
    watched: getRandomNumber(50, 500), // Watched count between 50 and 500
    lists: getRandomNumber(10, 100),   // List count between 10 and 100
    reviews: getRandomNumber(5, 200)   // Reviews count between 5 and 200
}));

console.log(members);


const memberlist = members.map((item) => 
<>
<div className="members-page__element">
<img src={sampleAvatar} className="members-page-profile multiple-member-picture"></img>

<div className="members-page-profile multiple-member-name"><span>{item.name}</span></div>

<div className="members-page-profile multiple-member-watchedcount"> 
<div className="members-page-profile-flex__image"> <img src={eyeImage}></img></div>
<div className="members-page-profile-flex__content">{item.watched}</div>
</div>

<div className="members-page-profile mutliple-member-listcount">
<div className="members-page-profile-flex__image"> <img src={listImage}></img></div>
<div className="members-page-profile-flex__content">{item.lists}</div> 
</div>

<div className="members-page-profile multiple-member-reviewcount">
<div className="members-page-profile-flex__image"> <img src={reviewImage}></img></div>
<div className="members-page-profile-flex__content">{item.reviews}</div>
</div>

</div>
<hr className="members-page-profile-linebreak"></hr>
</>
)

function Memberspage(){



    return(
        <>
        <div className="members-page-container">

            {/* MAKE MULITPLE ONCLICK TO SORT IN ASCNEDING DECENDING WHEN CLICKING ON COLUMN NAMES */}
            <div className="members-page__element member-heading-element ">
                <div className="members-page-profile member-empty-heading members-page-columns"></div>
                <div className="members-page-profile multiple-member-name members-page-columns"><span>Name</span></div>
                <div className="members-page-profile multiple-member-watchedcount members-page-columns"><span>Films</span></div>
                <div className="members-page-profile mutliple-member-listcount members-page-columns"><span>Lists</span></div> 
                <div className="members-page-profile multiple-member-reviewcount members-page-columns"><span>Reviews</span></div>
</div>
            <hr className="members-page-profile-linebreak"></hr>
            
            {memberlist}
        </div>
        </>
    )
}
export default Memberspage;