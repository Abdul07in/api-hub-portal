import type { FieldType, HttpMethod } from "@/common/enums";

export interface ApiField {
  name: string;
  type: FieldType;
  required: boolean;
  description: string;
  example?: string | number | boolean;
  enumValues?: string[];
  pattern?: RegExp;
  patternMessage?: string;
}

export interface ApiResponseExample {
  status: number;
  label: string;
  body: unknown;
}

export interface ApiSpec {
  id: string;
  moduleId: string;
  method: HttpMethod;
  path: string;
  name: string;
  description: string;
  headers: Record<string, string>;
  requestFields: ApiField[];
  sampleRequest: Record<string, unknown>;
  responses: ApiResponseExample[];
  responseFields: ApiField[];
}

export interface ApiModule {
  id: string;
  name: string;
  description: string;
  apis: ApiSpec[];
}
