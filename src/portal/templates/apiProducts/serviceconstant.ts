import { FieldType, HttpMethod } from "@/common/enums";
import type { ApiModule } from "@/common/interfaces/api";

export const CONTENT = {
  hero: {
    overline: "API CATALOG",
    title: "Build with PartnerHub APIs",
    description:
      "Accelerate your integration journey with our robust, secure, and developer-friendly REST APIs. Seamlessly verify identities and manage policies.",
  },
  searchPlaceholder: "Search API...",
  tabs: {
    overview: "Overview",
    request: "Request",
    response: "Response",
    fields: "Field Specifications",
  },
  request: {
    headers: "Headers",
    sampleBody: "Sample Request Body",
    endpointsInGroup: "ENDPOINTS IN THIS GROUP",
    curlSample: "CURL SAMPLE",
    tryItOut: "TRY IT OUT",
  },
  support: {
    title: "Facing issues?",
    description: "Reach out to our technical support team or join our Discord developer community.",
    channel: "Support Channel",
    bug: "Report a Bug",
  },
  fields: {
    requestFields: "Request Fields",
    responseFields: "Response Fields",
    table: {
      field: "Field",
      type: "Type",
      required: "Requirement", // changed to match image headers
      description: "Description",
      example: "Example",
      yes: "REQUIRED",
      no: "OPTIONAL",
      empty: "—",
    },
  },
};

export const STATIC_MODULES: ApiModule[] = [
  {
    id: "check-kyc",
    name: "KYC",
    description:
      "The KYC Verification Module API allows users to check the status of their KYC (Know Your Customer) compliance. This API is essential for ensuring that investors meet regulatory requirements before initiating any financial transactions, such as mutual fund purchases. It provides a straight forward way to verify whether a user's KYC is completed and valid.",
    features: [
      "Real-time PAN & Aadhaar validation.",
      "Support for multiple document types.",
      "Instant feedback on KYC compliance.",
      "Fetch tax status automatically.",
    ],
    flowSteps: [
      { title: "Step 1", desc: "Request for validation. Customer requests for PAN validation." },
      { title: "Step 2", desc: "Validation. System validates the PAN." },
      { title: "Step 3", desc: "Acknowledgement. Validation is complete." },
    ],
    apis: [
      {
        id: "check-kyc-api",
        moduleId: "check-kyc",
        method: HttpMethod.POST,
        path: "/checkkyc/verifyPan",
        name: "Check KYC API",
        description:
          "Verify customer identity documents through automated workflows. Supports PAN, Aadhaar (Masked), and other Government issued IDs with real-time response from authenticating agencies.",
        headers: {
          "Content-Type": "application/json",
          RequestID: "{{YOUR_API_KEY}}",
          ClientID: "UUID [Provided by ICICI Prudential AMC]",
          Authorization: "Bearer {{ACCESS_TOKEN}}",
        },
        requestFields: [
          {
            name: "Content-Type",
            type: FieldType.STRING,
            required: true,
            description: "application/json",
          },
          {
            name: "RequestID",
            type: FieldType.STRING,
            required: true,
            description: "{{YOUR_API_KEY}}",
          },
          {
            name: "x-correlation-id",
            type: FieldType.STRING,
            required: false,
            description: "UUID",
          },
        ],
        sampleRequest: {
          document_type: "PAN",
          document_number: "ABCDE1234F",
          user_details: {
            first_name: "Aditya",
            last_name: "Sharma",
            dob: "1990-05-15",
          },
          consent: true,
        },
        responses: [
          {
            status: 200,
            label: "Success",
            body: { success: true, message: "KYC verified successfully" },
          },
        ],
        responseFields: [],
      },
      {
        id: "get-tax-status-api",
        moduleId: "check-kyc",
        method: HttpMethod.GET,
        path: "/checkkyc/getData",
        name: "Get Tax Status API",
        description: "Fetch tax status information.",
        headers: {
          "x-api-key": "{{YOUR_API_KEY}}",
        },
        requestFields: [],
        sampleRequest: {},
        responses: [],
        responseFields: [],
      },
    ],
  },
  {
    id: "prospect-folio",
    name: "PROSPECT FOLIO",
    description:
      "This API enables partners to instantly create new investor folios via CAMS, simplifying the onboarding process. It supports real-time KYC validation and seamless integration with mutual fund platforms, ensuring a smooth and efficient investor experience.",
    features: [
      "Streamlined folio creation.",
      "Seamless integration with customer records.",
      "High availability and reliability.",
    ],
    flowSteps: [
      { title: "Step 1", desc: "Provide user details." },
      { title: "Step 2", desc: "System allocates a new folio number." },
      { title: "Step 3", desc: "Folio successfully created." },
    ],
    apis: [
      {
        id: "create-prospect-folio",
        moduleId: "prospect-folio",
        method: HttpMethod.POST,
        path: "/prospectfolio/create",
        name: "Create Prospect Folio API",
        description: "Creates a new prospect folio.",
        headers: {},
        requestFields: [],
        sampleRequest: {},
        responses: [],
        responseFields: [],
      },
    ],
  },
  {
    id: "instant-redemption",
    name: "INSTANT REDEMPTION",
    description:
      "The Instant Redemption API allows investors to redeem their mutual fund units instantly. It provides real-time processing, secure transaction handling, and immediate credit of funds to the investor’s account, enhancing liquidity and user satisfaction.",
    features: [
      "Real-time balance checks.",
      "Secure OTP verification.",
      "Instant exit load calculation.",
    ],
    flowSteps: [
      { title: "Step 1", desc: "User triggers redemption." },
      { title: "Step 2", desc: "System verifies OTP." },
      { title: "Step 3", desc: "Transaction posted." },
    ],
    apis: [
      {
        id: "get-exit-load",
        moduleId: "instant-redemption",
        method: HttpMethod.GET,
        path: "/ir/exitLoad",
        name: "Get Exit Load API",
        description: "Get exit load details.",
        headers: {},
        requestFields: [],
        sampleRequest: {},
        responses: [],
        responseFields: [],
      },
      {
        id: "check-available-balance",
        moduleId: "instant-redemption",
        method: HttpMethod.GET,
        path: "/ir/balance",
        name: "Check Available Balance API",
        description: "Check available balance.",
        headers: {},
        requestFields: [],
        sampleRequest: {},
        responses: [],
        responseFields: [],
      },
      {
        id: "otp-verification",
        moduleId: "instant-redemption",
        method: HttpMethod.POST,
        path: "/ir/otp",
        name: "OTP Verification API",
        description: "Verify OTP for instant redemption.",
        headers: {},
        requestFields: [],
        sampleRequest: {},
        responses: [],
        responseFields: [],
      },
      {
        id: "submit-ir",
        moduleId: "instant-redemption",
        method: HttpMethod.POST,
        path: "/ir/submit",
        name: "Submit IR API",
        description: "Submit instant redemption request.",
        headers: {},
        requestFields: [],
        sampleRequest: {},
        responses: [],
        responseFields: [],
      },
      {
        id: "post-ir",
        moduleId: "instant-redemption",
        method: HttpMethod.POST,
        path: "/ir/post",
        name: "Post IR API",
        description: "Post instant redemption details.",
        headers: {},
        requestFields: [],
        sampleRequest: {},
        responses: [],
        responseFields: [],
      },
    ],
  },
];
