function Navbar({ page, setPage }) {
  const pages = ["Home", "Favorites", "Shopping"];

  return (
    <nav className="navbar">
      {pages.map((item) => (
        <button
          key={item}
          type="button"
          className={page === item ? "active" : ""}
          onClick={() => setPage(item)}
        >
          {item}
        </button>
      ))}
    </nav>
  );
}

export default Navbar;