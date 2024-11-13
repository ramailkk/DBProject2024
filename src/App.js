import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Headerbox from "./Headerbox.js";
import Dashboard from "./Dashboard.js"
import Films from "./Filmpage.js";
import Members from "./Memberspage.js";
import Memberspage from "./Memberspage.js";
import Filmpage from "./Filmpage.js";
import Signup from "./Signup.js";
import Memberonly from "./Memberonly.js";
import Filmonly from "./Filmonly.js";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Headerbox />}>
          <Route index element={<Dashboard />} />
          <Route path="films" element={<Filmpage />} />
          <Route path="members" element={<Memberspage />} />
          <Route path="memberonly" element={<Memberonly />} />
          <Route path="signup" element={<Signup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);