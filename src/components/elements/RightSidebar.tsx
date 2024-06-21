import React from "react";
import Searchbar from "./Searchbar";
import SuggestionRobots from "./SuggestionBox/SuggestionRobots";
import SuggestionCommunities from "./SuggestionBox/SuggestionCommunities";

const RightSidebar = () => {
  return (
    <section className="flex flex-col gap-4">
      <Searchbar />
      <SuggestionRobots />
      <SuggestionCommunities />
    </section>
  );
};

export default RightSidebar;
