import { useEffect, useMemo, useState, type FC } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectModules, selectApiById } from "@/store/slices/apiCatalogSlice";
import { selectPartnerUser } from "@/store/slices/authSlice";
import { RootState } from "@/store";
import type { ApiSpec } from "@/common/interfaces/api";
import { FieldType } from "@/common/enums";
import SandboxRunnerService, { type SandboxResult } from "@/portal/services/sandboxRunner";
import SandboxTemplate from "@/portal/templates/sandbox/SandboxTemplate";

function defaultPayload(api: ApiSpec): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const f of api.requestFields) {
    if (f.example !== undefined) out[f.name] = f.example;
    else if (f.type === FieldType.BOOLEAN) out[f.name] = false;
    else if (f.type === FieldType.NUMBER) out[f.name] = 0;
    else out[f.name] = "";
  }
  return out;
}

const SandboxPage: FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const apiIdParam = searchParams.get("apiId");
  const apiCatalog = useSelector(selectModules);
  const foundApi = useSelector((state: RootState) =>
    apiIdParam ? selectApiById(state, apiIdParam) : null,
  );
  const partnerUser = useSelector(selectPartnerUser);

  const initial = foundApi || {
    module: apiCatalog[0],
    api: apiCatalog[0]?.apis[0],
  };

  const [moduleId, setModuleId] = useState(initial.module.id);
  const [apiId, setApiId] = useState(initial.api.id);
  const [payload, setPayload] = useState<Record<string, unknown>>(() =>
    defaultPayload(initial.api),
  );
  const [rawText, setRawText] = useState(() =>
    JSON.stringify(defaultPayload(initial.api), null, 2),
  );
  const [rawError, setRawError] = useState<string | null>(null);
  const [headers, setHeaders] = useState<Array<{ key: string; value: string }>>([
    { key: "", value: "" },
  ]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SandboxResult | null>(null);

  const currentModule = useMemo(
    () => apiCatalog.find((m) => m.id === moduleId)!,
    [moduleId, apiCatalog],
  );
  const currentApi = useMemo(
    () => currentModule.apis.find((a) => a.id === apiId) ?? currentModule.apis[0],
    [currentModule, apiId],
  );

  // When the API changes, reset payload + URL
  useEffect(() => {
    const fresh = defaultPayload(currentApi);
    setPayload(fresh);
    setRawText(JSON.stringify(fresh, null, 2));
    setRawError(null);
    setHeaders([{ key: "", value: "" }]);
    setResult(null);
    if (apiIdParam !== currentApi?.id && currentApi) {
      navigate(`/sandbox?apiId=${currentApi.id}`, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentApi?.id]);

  const handleField = (name: string, value: unknown) => {
    setPayload((p) => {
      const next = { ...p, [name]: value };
      setRawText(JSON.stringify(next, null, 2));
      return next;
    });
  };

  const handleSend = async () => {
    let body: Record<string, unknown>;
    try {
      body = JSON.parse(rawText);
      setRawError(null);
    } catch (e) {
      setRawError((e as Error).message);
      return;
    }
    setLoading(true);
    setResult(null);
    const res = await SandboxRunnerService.runSandbox(currentApi, body as Record<string, unknown>);
    setResult(res);
    setLoading(false);
  };

  const handleNavigateToDashboard = () => navigate("/partner/dashboard");
  const handleNavigateToContact = () => navigate("/contact");

  return (
    <SandboxTemplate
      apiCatalog={apiCatalog}
      moduleId={moduleId}
      setModuleId={setModuleId}
      apiId={apiId}
      setApiId={setApiId}
      currentModule={currentModule}
      currentApi={currentApi}
      payload={payload}
      rawText={rawText}
      setRawText={setRawText}
      rawError={rawError}
      loading={loading}
      result={result}
      headers={headers}
      setHeaders={setHeaders}
      handleField={handleField}
      handleSend={handleSend}
      subscriptionOpen={!partnerUser?.isSubscribed}
      onNavigateToDashboard={handleNavigateToDashboard}
      onNavigateToContact={handleNavigateToContact}
    />
  );
};

export default SandboxPage;
