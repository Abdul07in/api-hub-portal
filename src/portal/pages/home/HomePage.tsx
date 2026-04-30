import { type FC } from "react";
import { useSelector } from "react-redux";
import { selectModules } from "@/store/slices/apiCatalogSlice";
import { selectIsAuthenticated } from "@/store/slices/authSlice";
import HomeTemplate from "@/portal/templates/home/HomeTemplate";

const HomePage: FC = () => {
  const apiCatalog = useSelector(selectModules);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return <HomeTemplate apiCatalog={apiCatalog} isAuthenticated={isAuthenticated} />;
};

export default HomePage;
