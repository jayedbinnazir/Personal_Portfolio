import React, { useEffect, useState } from "react";
import Hero from "./miniComponents/Hero";
import Timeline from "./miniComponents/Timeline";
import Skills from "./miniComponents/Skills";
import MyApps from "./miniComponents/MyApps";
import About from "./miniComponents/About";
import { ThemeProvider } from "@/components/theme-provider";
import Portfolio from "./miniComponents/Portfolio";
import Contact from "./miniComponents/Contact";
import axios from "axios";
import { ClipLoader } from "react-spinners"; // Import a spinner from react-spinners

export const ProfileContext = React.createContext(null);

const Home = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMyProfile = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_APP_URL}/api/v1/user/portfolio/me`,
          { withCredentials: true }
        );
        setUser(data.user);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };
    getMyProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ClipLoader color={"#123abc"} loading={loading} size={150} />
      </div>
    );
  }

  return (
    <article className="px-5 mt-10 sm:mt-14 md:mt-16 lg:mt-24 xl:mt-32 sm:mx-auto w-full max-w-[1050px] flex flex-col gap-14">
      <ProfileContext.Provider value={user}>
        <Hero />
        <Timeline />
        <About />
        <Skills />
        <Portfolio />
        <MyApps />
        <Contact />
      </ProfileContext.Provider>
    </article>
  );
};

export default Home;
