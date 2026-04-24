import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectModules } from "@/store/slices/apiCatalogSlice";
import { selectPartnerUser } from "@/store/slices/authSlice";
import ApiProductsTemplate from "@/portal/templates/apiProducts/ApiProductsTemplate";

export default function ApiProductsPage() {
  const navigate = useNavigate();
  const apiCatalog = useSelector(selectModules);
  const partnerUser = useSelector(selectPartnerUser);
  const isSubscribed = partnerUser?.isSubscribed ?? false;
  
  const [activeModuleId, setActiveModuleId] = useState(apiCatalog[0]?.id || "");
  const [activeApiId, setActiveApiId] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const handleTry = (apiId: string) => {
    navigate(`/sandbox?apiId=${apiId}`);
  };

  const filteredModules = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return apiCatalog;
    return apiCatalog
      .map((m) => ({
        ...m,
        apis: m.apis.filter(
          (a) =>
            a.name.toLowerCase().includes(q) ||
            a.path.toLowerCase().includes(q) ||
            m.name.toLowerCase().includes(q),
        ),
      }))
      .filter((m) => m.apis.length > 0 || m.name.toLowerCase().includes(q));
  }, [search, apiCatalog]);

  const activeModule =
    filteredModules.find((m) => m.id === activeModuleId) ??
    filteredModules[0] ??
    apiCatalog[0] ??
    null;

  const activeApi = activeModule?.apis.find(a => a.id === activeApiId) ?? null;

  return (
    <ApiProductsTemplate
      search={search}
      setSearch={setSearch}
      filteredModules={filteredModules}
      activeModuleId={activeModuleId}
      setActiveModuleId={setActiveModuleId}
      activeModule={activeModule}
      activeApiId={activeApiId}
      setActiveApiId={setActiveApiId}
      activeApi={activeApi}
      onTryInSandbox={handleTry}
      isSubscribed={isSubscribed}
    />
  );
}
