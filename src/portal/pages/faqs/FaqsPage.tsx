import { useMemo, useState } from "react";
import { faqGroups } from "@/common/helpers/constant/faqs";
import FaqsTemplate from "@/portal/templates/faqs/FaqsTemplate";

export default function FaqsPage() {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return faqGroups;
    return faqGroups
      .map((g) => ({
        ...g,
        items: g.items.filter(
          (it) => it.q.toLowerCase().includes(term) || it.a.toLowerCase().includes(term),
        ),
      }))
      .filter((g) => g.items.length > 0);
  }, [q]);

  return <FaqsTemplate q={q} setQ={setQ} filtered={filtered} />;
}
