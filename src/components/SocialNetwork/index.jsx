import React from "react";
import { Facebook, Github, Linkedin, Twitter } from "../../utils/Icons";
import { social } from "../../utils/Data/social.json";

const SocialNetwork = () => {
  const getIcon = (item) => {
    let icon = {};
    if (item === "github") icon = <Github />;
    if (item === "twitter") icon = <Twitter />;
    if (item === "linkedin") icon = <Linkedin />;
    if (item === "facebook") icon = <Facebook />;
    return icon;
  };

  return (
    <ul className="socialWrap">
      {social.map((menu, index) => (
        <li key={index}>
          <a
            href={menu.url}
            alt={menu.title}
            target="_blank"
            rel="noopener noreferrer"
          >
            {getIcon(menu.icon)}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default SocialNetwork;
