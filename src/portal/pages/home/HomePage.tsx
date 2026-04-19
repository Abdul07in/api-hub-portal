import { useSelector } from "react-redux";
import { selectModules } from "@/store/slices/apiCatalogSlice";
import HomeTemplate from "@/portal/templates/home/HomeTemplate";

export default function HomePage() {
  const apiCatalog = useSelector(selectModules);

  return <HomeTemplate apiCatalog={apiCatalog} />;
}
