import Link from "next/link";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

const socials = [
  { icon: <FaGithub />, path: "https://github.com/princejacob528" },
  { icon: <FaLinkedin />, path: "https://www.linkedin.com/in/princejacob528" },
  {
    icon: <FaInstagram />,
    path: "https://www.instagram.com/_prince_j26_/?igsh=ZmNuZ2p2dW9mbjZ2&utm_source=qr",
  },
];

const Socials = ({ containerStyles, iconStyles }) => {
  return (
    <div className={containerStyles}>
      {socials.map((social, index) => (
        <Link href={social.path} key={index} className={iconStyles}>
          {social.icon}
        </Link>
      ))}
    </div>
  );
};

export default Socials;
