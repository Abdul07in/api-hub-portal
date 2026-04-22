import { useSelector } from "react-redux";
import { selectModules } from "@/store/slices/apiCatalogSlice";
import { selectIsAuthenticated } from "@/store/slices/authSlice";
import HomeTemplate from "@/portal/templates/home/HomeTemplate";

export default function HomePage() {
  const apiCatalog = useSelector(selectModules);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return <HomeTemplate apiCatalog={apiCatalog} isAuthenticated={isAuthenticated} />;
}
