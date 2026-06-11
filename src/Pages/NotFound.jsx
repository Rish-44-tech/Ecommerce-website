import Header from "../Components/Header.jsx";
import "./NotFound.css";

export default function NotFound() {
  return (
    <>
    <title>Page Not Found</title>
    <link rel="icon" href="images/404-favicon.jpg" />
      <Header></Header>
      <div className="not-found-container">
        <div className="not-found-div"> Oops! The page you were looking for is not available!</div>
      </div>
    </>
  );
}
