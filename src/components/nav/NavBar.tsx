import { Link } from "react-router-dom";
import { navLinks } from "./data";
import { useAuth } from "../../context/auth/useContext";

export default function NavBar() {
  const { isAuth, logout } = useAuth();
  const session = isAuth();
  console.log(session);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark top shadow">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          R.R.H.H
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasDarkNavbar"
          aria-controls="offcanvasDarkNavbar"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="offcanvas  offcanvas-end text-bg-dark"
          tabIndex={-1}
          id="offcanvasDarkNavbar"
          aria-labelledby="offcanvasDarkNavbarLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">
              Menu
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              {navLinks.map((n) => {
                if(n.auth === "no-auth" && session) return;
                if(n.role && !session?.roles.includes(n.role)) return;
                return (
                  <li key={n.url} className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to={n.url}
                    >
                      {n.name}
                    </Link>
                  </li>
                );
              })}
              {session && (
                <li className="nav-item">
                  <button
                    type="button"
                    onClick={logout}
                    className="nav-link active"
                    aria-current="page"
                  >
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
