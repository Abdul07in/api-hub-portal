import { type FC } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import { faqGroups } from "@/common/helpers/constant/faqs";
import { CONTENT } from "./serviceconstant";
import "./FaqsTemplate.scss";

export interface FaqsTemplateProps {
  q: string;
  setQ: (val: string) => void;
  filtered: typeof faqGroups;
}

const FaqsTemplate: FC<FaqsTemplateProps> = ({ q, setQ, filtered }) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => setQ(e.target.value);
  return (
    <Box className="faqs-template">
      <Typography variant="overline" className="faqs-template__hero-overline">
        {CONTENT.hero.overline}
      </Typography>
      <Typography variant="h3" className="faqs-template__hero-title">
        {CONTENT.hero.title}
      </Typography>
      <Typography className="faqs-template__hero-desc">{CONTENT.hero.description}</Typography>

      <TextField
        fullWidth
        placeholder={CONTENT.searchPlaceholder}
        value={q}
        onChange={handleSearchChange}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          },
        }}
        className="faqs-template__search"
      />

      <Stack spacing={4}>
        {filtered.map((g) => (
          <Box key={g.category}>
            <Typography variant="h6" className="faqs-template__category-title">
              {g.category}
            </Typography>
            {g.items.map((it, i) => (
              <Accordion key={i} disableGutters className="faqs-template__item">
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography className="faqs-template__question">{it.q}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography className="faqs-template__answer">{it.a}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        ))}
        {filtered.length === 0 && (
          <Typography className="faqs-template__no-results">
            {CONTENT.noResultsPrefix}
            {q}
            {CONTENT.noResultsSuffix}
          </Typography>
        )}
      </Stack>
    </Box>
  );
};

export default FaqsTemplate;
