import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Headerbox from "../PagesJS/Headerbox.js";
import Dashboard from "../PagesJS/Dashboard.js";
import Memberspage from "../PagesJS/Memberspage.js";
import Filmpage from "../PagesJS/Filmpage.js";
import Signup from "../PagesJS/Signup.js";
import Memberonly from "../PagesJS/Memberonly.js";
import Filmonly from "../PagesJS/Filmonly.js";
import { FilmProvider } from '../PagesJS/FilmContext.js';
import { SelectedMemberContext, SelectedMemberProvider } from '../PagesJS/SelectedMemberContext.js';
import Reviews from "../PagesJS/Reviews.js";
import { AuthProvider }from "../PagesJS/AuthContext.js";
export default function App() {
  return (
    <div>
      <FilmProvider>
        <BrowserRouter>
        <AuthProvider>

            <SelectedMemberProvider>
              <Routes>
                <Route path="/" element={<Headerbox />}>
                  <Route index element={<Dashboard />} />
                  <Route path="films" element={<Filmpage />} />
                  <Route path="members" element={<Memberspage />} />
                  <Route path="memberonly" element={<Memberonly />} />
                  <Route path="filmonly" element={<Filmonly />} />
                  <Route path="signup" element={<Signup />} />
                  <Route path="reviews" element={<Reviews />} />
                </Route>
              </Routes>
            </SelectedMemberProvider>
            </AuthProvider>
        </BrowserRouter>
      </FilmProvider>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
