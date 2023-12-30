import "./variables.css";
import './utils.css';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from "react-notifications";
import MoviesList from './MoviesList/MoviesList';
import Header from "./Header/Header";
import MoviePage from "./MoviePage/MoviePage";
import MovieManipPage from "./MovieManipPage/MovieManipPage";
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<MoviesList />} />
          <Route path="/movie/:id" element={<MoviePage />} />
          <Route path="/edit/:id" element={<MovieManipPage type="edit" />} />
          <Route path="/create" element={<MovieManipPage type="create" />} />
        </Routes>
      </main>
      <NotificationContainer />
    </>
  );
}

export default App;
