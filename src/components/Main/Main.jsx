import React from "react";

import imageLo from "../../assets/placeholder.png";

import CardPoster  from "../Card/Card";

const Main = () => {
  return (
    <div style={{ display: "flex", margin: "2rem"}}>
      <CardPoster text='Series' link='series' img={imageLo} />
      <CardPoster text='Peliculas' link='peliculas' img={imageLo} />
    </div>
  );
};

export default Main;
