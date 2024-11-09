import "./Memberspage.css"

const template = { name: "name", picture: 0, watched: 321, lists: 412, reviews:853 };

const members = Array.from({ length: 30 }, () => ({ ...template }));
// how the result array should come out to be 

const memberlist = members.map((item) => 
<div className="members-page__element">
<div className="members-page-profile multiple-member-picture"><a href="#">{item.picture}</a></div>
<div className="members-page-profile multiple-member-name"><a href="#">{item.name}</a></div>
<div className="members-page-profile multiple-member-watchedcount"><a href="#">{item.watched}</a></div>
<div className="members-page-profile mutliple-member-listcount"><a href="#">{item.lists}</a></div>
<div className="members-page-profile multiple-member-reviewcount"><a href="#">{item.reviews}</a></div>
</div>
)

function Memberspage(){
    return(
        <>
        <div className="members-page-criteria-selectorbox">
            <h3 className="members-page-criteria-selectorbox__element">sort by</h3>
            <div className="members-page-criteria-selectorbox__element">Name</div>
            <div className="members-page-criteria-selectorbox__element">Watched</div>
            <div className="members-page-criteria-selectorbox__element">Lists</div>
            <div className="members-page-criteria-selectorbox__element">Reviews</div>
            <div className="members-page-criteria-selectorbox__element">Date</div>
            
        </div>
        <div 
        className="members-page-container">
            <h3>Members</h3>
            {memberlist}
        </div>
        </>
    )
}
export default Memberspage;