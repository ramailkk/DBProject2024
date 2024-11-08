import Headerbox from "./Headerbox";
import "./Memberspage.css"

const template = { name: "name", picture: 0, watched: 321, lists: 412, reviews:853 };

const members = Array.from({ length: 30 }, () => ({ ...template }));


const memberlist = members.map((item) => <div className="childmember">
<div className="profile picture">
    <a href="#">{item.picture}</a>
</div>
<div className="profile name"><a href="#">{item.name}</a></div>
<div className="profile watched"><a href="#">{item.watched}</a></div>
<div className="profile lists"><a href="#">{item.lists}</a></div>
<div className="profile reviews"><a href="#">{item.reviews}</a></div>
</div>)

function Memberspage(){
    return(
        <>
        <Headerbox></Headerbox>
        <div className="criteraselectorbox">
            <h3 className="criterachild">sort by</h3>
            <div className="criterachild">Name</div>
            <div className="criterachild">Watched</div>
            <div className="criterachild">Lists</div>
            <div className="criterachild">Reviews</div>
            <div className="criterachild">Date</div>
            
        </div>
        <div 
        className="membercontainer">
            <h3>Members</h3>
            {memberlist}
        </div>
        </>
    )
}
export default Memberspage;