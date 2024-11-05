import {
  ExternalLink,
  Facebook,
  Github,
  Instagram,
  Linkedin,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import { Button } from "@/components/ui/button";
import { ProfileContext } from "../Home";
import { useContext } from "react";

const Hero = () => {
  const user = useContext(ProfileContext);

  console.log(user);

  return (
    <div className="w-full">
      {/* Avatar Section */}
      <div className="flex items-center gap-10 mb-4 ">
        <div className="w-64 h-64 rounded-full p-[4px] bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">
          <img
            src={user?.avatar?.url} // Avatar image URL from user context
            alt="User Avatar"
            className="w-full h-full rounded-full object-cover" // Ensure the image is round and fills the container
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="bg-green-400 rounded-full h-4 w-4"></span>
          <p className="text-[1.5rem]">Open for hiring</p>
        </div>
      </div>

      <h1
        className="overflow-x-hidden text-[1.3rem] sm:text-[1.75rem]
        md:text-[2.2rem] lg:text-[2.8rem] tracking-[2px] mb-4"
      >
        Hey, I'm {user.fullName}
      </h1>
      <h1
        className="text-tubeLight-effect overflow-x-hidden text-[1.3rem]
        sm:text-[1.75rem] md:text-[2.2rem] lg:text-[2.8rem] tracking-[15px]"
      >
        <Typewriter
          words={["FULLSTACK DEVELOPER (MERN)"]}
          loop={50}
          cursor
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1000}
        />
      </h1>

      <div
        className="w-fit px-5 py-2 bg-slate-50 rounded-[20px] flex gap-5
        items-center mt-4 md:mt-8 lg:mt-10"
      >
        <Link to={user.instagramURL} target="_blank">
          <Instagram className="text-pink-500 w-7 h-7" />
        </Link>
        <Link to={user.facebookURL} target="_blank">
          <Facebook className="text-blue-800 w-7 h-7" />
        </Link>
        <Link to={user.linkedInURL} target="_blank">
          <Linkedin className="text-sky-500 w-7 h-7" />
        </Link>
      </div>

      <div className="mt-4 md:mt-8 lg:mt-10 flex gap-3">
        <Link to={user?.githubURL} target="_blank">
          <Button className="rounded-[30px] flex items-center gap-2 flex-row">
            <span>
              <Github />
            </span>
            <span>Github</span>
          </Button>
        </Link>
        <Link to={user.resume && user.resume.url} target="_blank">
          <Button className="rounded-[30px] flex items-center gap-2 flex-row">
            <span>
              <ExternalLink />
            </span>
            <span>CV / Resume</span>
          </Button>
        </Link>
      </div>

      <p className="mt-8 text-xl tracking-[2px]">{user.aboutMe}</p>
      <hr className="my-8 md::my-10 " />
    </div>
  );
};

export default Hero;
