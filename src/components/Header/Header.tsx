import { Link } from "react-router-dom";
import css from "./Header.module.css";

export default function Header() {
  return (
    <header className={css.header}>
      <Link to="register">
        <button>Register</button>
      </Link>

      <Link to="login">
        <button>Log in</button>
      </Link>
    </header>
  );
}
