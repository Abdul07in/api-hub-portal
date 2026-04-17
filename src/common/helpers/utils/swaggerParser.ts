import { FieldType, HttpMethod } from "@/common/enums";
import type { ApiModule, ApiSpec, ApiField, ApiResponseExample } from "@/common/interfaces/api";

const specsGlob = import.meta.glob("@/openspecs/*.json", { eager: true });

export const parseSwaggerToCatalog = (): ApiModule[] => {
  const modulesMap: Record<string, ApiModule> = {};

  Object.values(specsGlob).forEach((moduleExports: any) => {
    const spec = moduleExports.default || moduleExports;

    // Initialize modules from tags
    if (spec.tags && Array.isArray(spec.tags)) {
      spec.tags.forEach((tag: any) => {
        // Use tag name converted to a simple id as the module id
        const id = tag.name.toLowerCase().replace(/\s+/g, "-");
        if (!modulesMap[tag.name]) {
          modulesMap[tag.name] = {
            id,
            name: tag.name,
            description: tag.description || "",
            apis: [],
          };
        } else if (!modulesMap[tag.name].description && tag.description) {
          modulesMap[tag.name].description = tag.description;
        }
      });
    }

    // Iterate over paths to build apis
    if (spec.paths) {
      Object.entries(spec.paths).forEach(([pathUrl, methods]: [string, any]) => {
        Object.entries(methods).forEach(([method, operation]: [string, any]) => {
          const tagName = operation.tags && operation.tags.length > 0 ? operation.tags[0] : "Other";

          if (!modulesMap[tagName]) {
            modulesMap[tagName] = {
              id: tagName.toLowerCase().replace(/\s+/g, "-"),
              name: tagName,
              description: "",
              apis: [],
            };
          }

          const moduleId = modulesMap[tagName].id;
          const apiId =
            operation.operationId || pathUrl.replace(/[^a-zA-Z0-9]/g, "-").replace(/^-+|-+$/g, "");

          // Build headers
          const headers: Record<string, string> = {};
          if (operation.parameters) {
            operation.parameters.forEach((param: any) => {
              if (param.in === "header") {
                headers[param.name] = param.example || `<${param.name.toUpperCase()}>`;
              }
            });
          }

          // Build requestFields
          const requestFields: ApiField[] = [];
          let sampleRequest: Record<string, unknown> = {};

          if (
            operation.requestBody &&
            operation.requestBody.content &&
            operation.requestBody.content["application/json"]
          ) {
            // If it's the encrypted dto, just show content
            const schema = operation.requestBody.content["application/json"].schema;
            if (schema && schema.$ref) {
              const refName = schema.$ref.split("/").pop();
              if (
                refName &&
                spec.components &&
                spec.components.schemas &&
                spec.components.schemas[refName]
              ) {
                const refSchema = spec.components.schemas[refName];
                if (refSchema.properties) {
                  Object.entries(refSchema.properties).forEach(
                    ([propName, propDetails]: [string, any]) => {
                      requestFields.push({
                        name: propName,
                        type: propDetails.type === "string" ? FieldType.STRING : FieldType.OBJECT,
                        required: true,
                        description:
                          operation.requestBody.description || propDetails.description || "",
                      });
                      sampleRequest[propName] = "encrypted_base64_string...";
                    },
                  );
                }
              }
            }
          }

          // Build responses
          const responses: ApiResponseExample[] = [];
          const responseFields: ApiField[] = [];

          if (operation.responses) {
            Object.entries(operation.responses).forEach(
              ([statusCode, responseDetails]: [string, any]) => {
                const statusNum = parseInt(statusCode, 10);

                // For sample response body, just use a generic representation based on EncryptedContentDto
                let body: unknown = {};
                if (responseDetails.content && responseDetails.content["application/json"]) {
                  body = { content: "encrypted_response_payload..." };

                  // only add response field once
                  if (responseFields.length === 0) {
                    responseFields.push({
                      name: "content",
                      type: FieldType.STRING,
                      required: true,
                      description: "Encrypted response payload",
                    });
                  }
                } else if (responseDetails.content && responseDetails.content["*/*"]) {
                  body = { content: "encrypted_response_payload..." };

                  // only add response field once
                  if (responseFields.length === 0) {
                    responseFields.push({
                      name: "content",
                      type: FieldType.STRING,
                      required: true,
                      description: "Encrypted response payload",
                    });
                  }
                }

                responses.push({
                  status: statusNum,
                  label: responseDetails.description || "Response",
                  body,
                });
              },
            );
          }

          const apiSpec: ApiSpec = {
            id: apiId,
            moduleId,
            method: method.toUpperCase() as HttpMethod,
            path: pathUrl,
            name: operation.summary || apiId,
            description: operation.description || "",
            headers,
            requestFields,
            sampleRequest,
            responses,
            responseFields,
          };

          modulesMap[tagName].apis.push(apiSpec);
        });
      });
    }
  });

  return Object.values(modulesMap);
};
