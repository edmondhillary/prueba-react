import { Navigate, useRoutes } from "react-router-dom";
import Peliculas from "../components/Pages/Peliculas/Peliculas";
import Series from "../components/Pages/Series/Series";

export const Routes = () => {
  return useRoutes([
    {
      element: <Peliculas />,
      path: "/peliculas",
    },
    {
      element: <Series />,
      path: "/series",
    },
  ]);
};
