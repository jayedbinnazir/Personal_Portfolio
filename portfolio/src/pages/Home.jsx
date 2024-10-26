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

export const ProfileContext = React.createContext(null);

const Home = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const getMyProfile = async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_URL}/api/v1/user/portfolio/me`,
        { withCredentials: true }
      );
      console.log(data.user);
      setUser(data.user);
    };
    getMyProfile();
  }, []);

  if (!user) {
    return <h1>...Loading</h1>;
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
