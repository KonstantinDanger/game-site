import HomePage from "../../pages/MainPage/MainPage";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";
import LeaderBoardPage from "../../pages/LeaderBoardPage/LeaderBoardPage";
import PlayerStatsPage from "../../pages/PlayerStatsPage/PlayerStatsPage";
import RegisterPage from "../../pages/RegisterPage/RegisterPage";
import LoginPage from "../../pages/LoginPage/LoginPage";

import css from "./Body.module.css";

import { Route, Routes } from "react-router-dom";

export default function Body() {
  return (
    <div className={css.body}>
      <div className={css.content}>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>

          <Route path="/leaderboard" element={<LeaderBoardPage />}></Route>
          <Route
            path="/playerstats/:playerId"
            element={<PlayerStatsPage />}
          ></Route>

          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>

          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
      </div>
    </div>
  );
}
