import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Headerbox from "../PagesJS/Headerbox.js";
import Dashboard from "../PagesJS/Dashboard.js";
import Memberspage from "../PagesJS/Memberspage.js";
import Filmpage from "../PagesJS/Filmpage.js";
import Signup from "../PagesJS/Signup.js";
import Memberonly from "../PagesJS/Memberonly.js";
import Filmonly from "../PagesJS/Filmonly.js";

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