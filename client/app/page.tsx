import Sidebar from "./components/main/Sidebar";
import Main from "./components/main/Main"; 
import Footer from "./components/main/Footer";
export default function Home() {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <Main />
      </div>
      <Footer />
    </>
  );
}
