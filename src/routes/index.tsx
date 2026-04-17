import { createFileRoute } from "@tanstack/react-router";
import HomePage from "@/portal/pages/home/HomePage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ICICI Pru AMC PartnerHub — API Developer Portal" },
      {
        name: "description",
        content:
          "Developer portal for ICICI Prudential AMC distribution partners. Explore the API catalog and try endpoints in the in-browser sandbox.",
      },
    ],
  }),
  component: HomePage,
});
