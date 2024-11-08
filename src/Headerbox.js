import "./Headerbox.css"

function Headerbox(){
    return(
        <>
        <div className="headerbox">
        <div className="headerboxcomponent logo">LOGO</div>
        <a href="www.google.com" className="headerboxcomponent">Home</a>
        <a href="www.google.com" className="headerboxcomponent">Films</a>
        <a href="www.google.com" className="headerboxcomponent">Members</a>
        <a href="www.google.com" className="headerboxcomponent">Settings</a>
        <a href="www.google.com" className="headerboxcomponent">Login</a>
        <a href="www.google.com" className="headerboxcomponent">Signup</a>
        </div>
        </>
    )
}
export default Headerbox;