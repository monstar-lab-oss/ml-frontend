import { Link } from "wouter";

const NotFound = () => (
    <div>
      <h1>404 - Not found</h1>
      <p>The page you were looking for was not found.</p>
      <Link href="/">
        <button>Go to home</button>
      </Link>
    </div>
);
export default NotFound;
