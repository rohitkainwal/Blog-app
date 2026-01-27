import React from "react";
import { useContext , useState} from "react";
import { RouterProvider } from "react-router-dom";
import { myRoute } from "./routes/Routing";
import { Toaster } from "react-hot-toast";
import { AuthContext } from "./context/AuthContext";
import { useEffect } from "react";
import AOS from "aos"
import "aos/dist/aos.css";


const App = () => {
  const { loading } = useContext(AuthContext);

``
  
const [theme, setTheme] = useState("light");

useEffect(() => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    setTheme(savedTheme);
  }
}, []);


useEffect(() => {
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}, [theme]);


   useEffect(() => {
    AOS.init({
     duration: 1200,        // animation duration
      easing: "ease-out-cubic",
      once: false,           // animate multiple times
      mirror: true,  
    });
     const refreshAOS = () => AOS.refresh();

    // Listen to window load (all images)
    window.addEventListener("load", refreshAOS);

    return () => window.removeEventListener("load", refreshAOS);
  }, []);


  

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }
  return (
    <div>
      <RouterProvider router={myRoute} />
      <Toaster />
    </div>
  );
};

export default App;
