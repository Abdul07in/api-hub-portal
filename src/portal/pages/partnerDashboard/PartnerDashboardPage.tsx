import { useSelector } from "react-redux";

import PartnerDashboardTemplate from "@/portal/templates/partnerDashboard/PartnerDashboardTemplate";
import { selectModules } from "@/store/slices/apiCatalogSlice";
import { selectPartnerUser } from "@/store/slices/authSlice";

export default function PartnerDashboardPage() {
  const partner = useSelector(selectPartnerUser);
  const apiCatalog = useSelector(selectModules);

  const apiCount = apiCatalog.reduce((total, module) => total + module.apis.length, 0);

  return (
    <PartnerDashboardTemplate
      partner={partner}
      moduleCount={apiCatalog.length}
      apiCount={apiCount}
    />
  );
}
