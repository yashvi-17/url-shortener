import Navbar from "../components/Navbar";
import UrlForm from "../components/UrlForm";
import UrlList from "../components/UrlList";
import "../styles/home.css";

function Home() {
  return (
    <div>
      <Navbar />
      <UrlForm />
      <UrlList />
    </div>
  );
}

export default Home;