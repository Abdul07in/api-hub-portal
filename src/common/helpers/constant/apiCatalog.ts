import { FieldType, HttpMethod } from "@/common/enums";
import type { ApiModule } from "@/common/interfaces/api";

const PAN_FIELD = {
  name: "pan",
  type: FieldType.STRING,
  required: true,
  description: "Permanent Account Number (10 chars, format AAAAA9999A).",
  example: "ABCDE1234F",
  pattern: /^[A-Z]{5}[0-9]{4}[A-Z]$/,
  patternMessage: "PAN must match AAAAA9999A",
};

export const apiCatalog: ApiModule[] = [
  {
    id: "fatca",
    name: "FATCA Details",
    description:
      "APIs for FATCA details operations — fetch and submit FATCA declarations linked to a PAN.",
    apis: [
      {
        id: "fatca-get",
        moduleId: "fatca",
        method: HttpMethod.POST,
        path: "/fatca/getFatcaDetails",
        name: "Get FATCA Details",
        description: "Retrieve FATCA declaration details for a given PAN.",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "<YOUR_API_KEY>",
          Authorization: "Bearer <ACCESS_TOKEN>",
        },
        requestFields: [PAN_FIELD],
        sampleRequest: { pan: "ABCDE1234F" },
        responses: [
          {
            status: 200,
            label: "Success",
            body: {
              status: "SUCCESS",
              pan: "ABCDE1234F",
              fatca: {
                taxResidency: "IN",
                birthCountry: "IN",
                occupation: "Service",
                grossAnnualIncome: "5L-10L",
                sourceOfWealth: "Salary",
                politicallyExposed: false,
                lastUpdated: "2025-02-14T10:32:11Z",
              },
            },
          },
          {
            status: 404,
            label: "Not Found",
            body: {
              status: "ERROR",
              code: "FATCA_NOT_FOUND",
              message: "No FATCA record found for given PAN.",
            },
          },
          {
            status: 400,
            label: "Bad Request",
            body: { status: "ERROR", code: "INVALID_PAN", message: "PAN format is invalid." },
          },
        ],
        responseFields: [
          {
            name: "status",
            type: FieldType.STRING,
            required: true,
            description: "SUCCESS or ERROR",
          },
          { name: "pan", type: FieldType.STRING, required: true, description: "Echoed PAN" },
          {
            name: "fatca.taxResidency",
            type: FieldType.STRING,
            required: true,
            description: "ISO country code",
          },
          {
            name: "fatca.occupation",
            type: FieldType.STRING,
            required: false,
            description: "Investor occupation",
          },
          {
            name: "fatca.politicallyExposed",
            type: FieldType.BOOLEAN,
            required: true,
            description: "PEP flag",
          },
        ],
      },
      {
        id: "fatca-insert",
        moduleId: "fatca",
        method: HttpMethod.POST,
        path: "/fatca/insertFatcaDetails",
        name: "Insert FATCA Details",
        description: "Submit a new FATCA declaration for a PAN.",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "<YOUR_API_KEY>",
          Authorization: "Bearer <ACCESS_TOKEN>",
        },
        requestFields: [
          PAN_FIELD,
          {
            name: "taxResidency",
            type: FieldType.STRING,
            required: true,
            description: "ISO country code of tax residency.",
            example: "IN",
          },
          {
            name: "birthCountry",
            type: FieldType.STRING,
            required: true,
            description: "ISO country code of birth.",
            example: "IN",
          },
          {
            name: "occupation",
            type: FieldType.ENUM,
            required: true,
            description: "Investor's occupation.",
            enumValues: [
              "Service",
              "Business",
              "Professional",
              "Retired",
              "Housewife",
              "Student",
              "Others",
            ],
            example: "Service",
          },
          {
            name: "grossAnnualIncome",
            type: FieldType.ENUM,
            required: true,
            description: "Income bracket.",
            enumValues: ["<1L", "1L-5L", "5L-10L", "10L-25L", "25L-1Cr", ">1Cr"],
            example: "5L-10L",
          },
          {
            name: "sourceOfWealth",
            type: FieldType.STRING,
            required: true,
            description: "Source of wealth.",
            example: "Salary",
          },
          {
            name: "politicallyExposed",
            type: FieldType.BOOLEAN,
            required: true,
            description: "Is the investor politically exposed?",
            example: false,
          },
        ],
        sampleRequest: {
          pan: "ABCDE1234F",
          taxResidency: "IN",
          birthCountry: "IN",
          occupation: "Service",
          grossAnnualIncome: "5L-10L",
          sourceOfWealth: "Salary",
          politicallyExposed: false,
        },
        responses: [
          {
            status: 201,
            label: "Created",
            body: {
              status: "SUCCESS",
              referenceId: "FATCA-2025-00098231",
              message: "FATCA details saved.",
            },
          },
          {
            status: 409,
            label: "Conflict",
            body: {
              status: "ERROR",
              code: "FATCA_EXISTS",
              message: "FATCA record already exists for PAN.",
            },
          },
        ],
        responseFields: [
          {
            name: "status",
            type: FieldType.STRING,
            required: true,
            description: "SUCCESS or ERROR",
          },
          {
            name: "referenceId",
            type: FieldType.STRING,
            required: false,
            description: "Server-generated reference id",
          },
        ],
      },
    ],
  },
  {
    id: "taxinfo",
    name: "Tax Status",
    description: "APIs for retrieving tax status information for an investor PAN.",
    apis: [
      {
        id: "tax-status",
        moduleId: "taxinfo",
        method: HttpMethod.GET,
        path: "/taxinfo/getTaxStatus",
        name: "Get Tax Status",
        description: "Returns the tax status (Resident, NRI, etc.) for a given PAN.",
        headers: { "x-api-key": "<YOUR_API_KEY>", Authorization: "Bearer <ACCESS_TOKEN>" },
        requestFields: [PAN_FIELD],
        sampleRequest: { pan: "ABCDE1234F" },
        responses: [
          {
            status: 200,
            label: "Success",
            body: {
              status: "SUCCESS",
              pan: "ABCDE1234F",
              taxStatus: "RESIDENT_INDIVIDUAL",
              taxStatusCode: "01",
              asOfDate: "2025-04-01",
            },
          },
          {
            status: 404,
            label: "Not Found",
            body: { status: "ERROR", code: "PAN_NOT_FOUND", message: "PAN not found." },
          },
        ],
        responseFields: [
          {
            name: "status",
            type: FieldType.STRING,
            required: true,
            description: "SUCCESS or ERROR",
          },
          {
            name: "taxStatus",
            type: FieldType.STRING,
            required: true,
            description: "Human-readable tax status",
          },
          {
            name: "taxStatusCode",
            type: FieldType.STRING,
            required: true,
            description: "AMFI tax status code",
          },
        ],
      },
    ],
  },
  {
    id: "checkkyc",
    name: "KYC Verification",
    description:
      "APIs for KYC verification operations — check KYC status and verify PAN against the KYC service.",
    apis: [
      {
        id: "kyc-getdata",
        moduleId: "checkkyc",
        method: HttpMethod.POST,
        path: "/checkkyc/getData",
        name: "Verify KYC for a PAN",
        description: "Returns KYC details (status, KRA, last updated) for a PAN.",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "<YOUR_API_KEY>",
          Authorization: "Bearer <ACCESS_TOKEN>",
        },
        requestFields: [PAN_FIELD],
        sampleRequest: { pan: "ABCDE1234F" },
        responses: [
          {
            status: 200,
            label: "Success",
            body: {
              status: "SUCCESS",
              pan: "ABCDE1234F",
              kycStatus: "KYC_VERIFIED",
              kra: "CVL",
              kycDate: "2024-08-12",
              name: "RAHUL SHARMA",
            },
          },
          {
            status: 200,
            label: "KYC Pending",
            body: { status: "SUCCESS", pan: "ABCDE1234F", kycStatus: "KYC_PENDING", kra: null },
          },
        ],
        responseFields: [
          {
            name: "kycStatus",
            type: FieldType.STRING,
            required: true,
            description: "KYC_VERIFIED / KYC_PENDING / KYC_REJECTED",
          },
          { name: "kra", type: FieldType.STRING, required: false, description: "KRA agency name" },
          {
            name: "kycDate",
            type: FieldType.DATE,
            required: false,
            description: "Last KYC update date",
          },
        ],
      },
      {
        id: "kyc-verifypan",
        moduleId: "checkkyc",
        method: HttpMethod.POST,
        path: "/checkkyc/verifyPan",
        name: "Verify PAN using KYC Service",
        description:
          "Validates that a PAN exists in the KYC service and matches the provided name.",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "<YOUR_API_KEY>",
          Authorization: "Bearer <ACCESS_TOKEN>",
        },
        requestFields: [
          PAN_FIELD,
          {
            name: "name",
            type: FieldType.STRING,
            required: true,
            description: "Full name as per PAN.",
            example: "RAHUL SHARMA",
          },
        ],
        sampleRequest: { pan: "ABCDE1234F", name: "RAHUL SHARMA" },
        responses: [
          {
            status: 200,
            label: "Match",
            body: { status: "SUCCESS", pan: "ABCDE1234F", nameMatch: true, score: 0.97 },
          },
          {
            status: 200,
            label: "No Match",
            body: { status: "SUCCESS", pan: "ABCDE1234F", nameMatch: false, score: 0.42 },
          },
        ],
        responseFields: [
          {
            name: "nameMatch",
            type: FieldType.BOOLEAN,
            required: true,
            description: "Whether name matches KYC record",
          },
          {
            name: "score",
            type: FieldType.NUMBER,
            required: true,
            description: "Confidence score 0-1",
          },
        ],
      },
    ],
  },
  {
    id: "nsdl",
    name: "NSDL PAN Verification",
    description: "APIs for NSDL PAN verification operations.",
    apis: [
      {
        id: "nsdl-verify",
        moduleId: "nsdl",
        method: HttpMethod.POST,
        path: "/nsdl/nsdl-pan-verification",
        name: "Verify PAN via NSDL",
        description: "Authoritative PAN verification via NSDL.",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "<YOUR_API_KEY>",
          Authorization: "Bearer <ACCESS_TOKEN>",
        },
        requestFields: [PAN_FIELD],
        sampleRequest: { pan: "ABCDE1234F" },
        responses: [
          {
            status: 200,
            label: "Valid",
            body: {
              status: "SUCCESS",
              pan: "ABCDE1234F",
              panStatus: "VALID",
              name: "RAHUL SHARMA",
              lastNameUpdated: "2023-11-02",
            },
          },
          {
            status: 200,
            label: "Invalid",
            body: { status: "SUCCESS", pan: "ABCDE1234F", panStatus: "INVALID" },
          },
          {
            status: 502,
            label: "Upstream Error",
            body: {
              status: "ERROR",
              code: "NSDL_UNAVAILABLE",
              message: "NSDL service is currently unavailable.",
            },
          },
        ],
        responseFields: [
          {
            name: "panStatus",
            type: FieldType.STRING,
            required: true,
            description: "VALID / INVALID / DEACTIVATED",
          },
          {
            name: "name",
            type: FieldType.STRING,
            required: false,
            description: "Name as per NSDL",
          },
          {
            name: "lastNameUpdated",
            type: FieldType.DATE,
            required: false,
            description: "Last name update date",
          },
        ],
      },
    ],
  },
];

export const findApiById = (id: string) => {
  for (const m of apiCatalog) {
    const api = m.apis.find((a) => a.id === id);
    if (api) return { module: m, api };
  }
  return null;
};

export const findModuleById = (id: string) => apiCatalog.find((m) => m.id === id);
