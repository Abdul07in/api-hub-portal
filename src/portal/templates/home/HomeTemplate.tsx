import { useEffect, useRef, useState } from "react";
import { Box, Button, Container, Stack, Typography, useTheme } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import ScienceIcon from "@mui/icons-material/Science";
import ApiIcon from "@mui/icons-material/Api";

import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SecurityIcon from "@mui/icons-material/Security";
import SavingsIcon from "@mui/icons-material/Savings";
import { MdViewList, MdLayers, MdSecurity, MdBarChart, MdHeadset } from "react-icons/md";

import type { ApiModule } from "@/common/interfaces/api";
import { CONTENT } from "./serviceconstant";
import "./HomeTemplate.scss";

// ─── Parallax hero hook ──────────────────────────────────────────────────────
function useHeroParallax() {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return offset;
}

// ─── IntersectionObserver reveal hook ────────────────────────────────────────
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// ─── Reusable animated section wrapper ───────────────────────────────────────
function RevealSection({
  children,
  delay = 0,
  style,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  style?: React.CSSProperties;
  className?: string;
}) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export interface HomeTemplateProps {
  apiCatalog: ApiModule[];
}

export default function HomeTemplate({ apiCatalog }: HomeTemplateProps) {
  const theme = useTheme();
  const parallaxOffset = useHeroParallax();

  // Hero load animation
  const [heroLoaded, setHeroLoaded] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setHeroLoaded(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const benefitsData = [
    { ...CONTENT.benefits.items[0], icon: <IntegrationInstructionsIcon sx={{ fontSize: 40, color: "primary.main" }} /> },
    { ...CONTENT.benefits.items[1], icon: <AccessTimeIcon sx={{ fontSize: 40, color: "secondary.main" }} /> },
    { ...CONTENT.benefits.items[2], icon: <SecurityIcon sx={{ fontSize: 40, color: "primary.main" }} /> },
    { ...CONTENT.benefits.items[3], icon: <SavingsIcon sx={{ fontSize: 40, color: "secondary.main" }} /> },
  ];

  const featuresData = [
    { ...CONTENT.features.items[0], icon: <MdViewList size={40} color={theme.palette.primary.main} /> },
    { ...CONTENT.features.items[1], icon: <MdLayers size={40} color={theme.palette.secondary.main} /> },
    { ...CONTENT.features.items[2], icon: <MdSecurity size={40} color={theme.palette.primary.main} /> },
    { ...CONTENT.features.items[3], icon: <MdBarChart size={40} color={theme.palette.secondary.main} /> },
    { ...CONTENT.features.items[4], icon: <MdHeadset size={40} color={theme.palette.primary.main} /> },
  ];

  return (
    <Box className="home-template">
      {/* ── HERO ────────────────────────────────────────────────────── */}
      <Box className="home-template__hero">
        {/* Parallax background decoration */}
        <Box
          aria-hidden
          className="home-template__parallax-bg"
          style={{ transform: `translateY(${parallaxOffset * 0.45}px)` }}
        >
          <Box className="home-template__circle-top" />
          <Box className="home-template__circle-bottom" />
          <Box className="home-template__grid-dots" />
        </Box>

        {/* Hero content — slides up + fades in on load */}
        <Container maxWidth="xl" className="home-template__hero-container">
          <Box
            style={{
              transition: "opacity 0.9s ease, transform 0.9s ease",
              opacity: heroLoaded ? 1 : 0,
              transform: heroLoaded ? "translateY(0)" : "translateY(30px)",
            }}
          >
            <Typography variant="overline" className="home-template__hero-overline">
              {CONTENT.hero.overline}
            </Typography>
            <Typography
              variant="h1"
              className="home-template__hero-title"
              style={{
                transition: "opacity 0.9s ease 0.1s, transform 0.9s ease 0.1s",
                opacity: heroLoaded ? 1 : 0,
                transform: heroLoaded ? "translateY(0)" : "translateY(20px)",
              }}
            >
              {CONTENT.hero.title}
            </Typography>
            <Typography
              className="home-template__hero-desc"
              style={{
                transition: "opacity 0.9s ease 0.25s, transform 0.9s ease 0.25s",
                opacity: heroLoaded ? 0.9 : 0,
                transform: heroLoaded ? "translateY(0)" : "translateY(20px)",
              }}
            >
              {CONTENT.hero.description}
            </Typography>
            <Box
              className="home-template__hero-btns"
              style={{
                transition: "opacity 0.9s ease 0.4s, transform 0.9s ease 0.4s",
                opacity: heroLoaded ? 1 : 0,
                transform: heroLoaded ? "translateY(0)" : "translateY(20px)",
              }}
            >
              <Button
                component={RouterLink}
                to="/api-products"
                variant="contained"
                color="primary"
                size="large"
                startIcon={<ApiIcon />}
                className="home-template__btn"
              >
                {CONTENT.hero.primaryBtn}
              </Button>
              <Button
                component={RouterLink}
                to="/sandbox"
                variant="outlined"
                size="large"
                startIcon={<ScienceIcon />}
                className="home-template__btn home-template__btn-outline"
              >
                {CONTENT.hero.secondaryBtn}
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* ── INTRO ───────────────────────────────────────────────────── */}
      <Container maxWidth="xl" className="home-template__section-container">
        <RevealSection>
          <Box className="home-template__intro-box">
            <Typography variant="h3" className="home-template__intro-title">
              {CONTENT.intro.title}
            </Typography>
            <Typography variant="h6" className="home-template__intro-desc">
              {CONTENT.intro.description}
            </Typography>
          </Box>
        </RevealSection>
      </Container>

      {/* ── BENEFITS ────────────────────────────────────────────────── */}
      <Box className="home-template__benefits-section">
        <Container maxWidth="xl">
          <RevealSection>
            <Typography variant="h4" className="home-template__section-heading">
              {CONTENT.benefits.title}
            </Typography>
          </RevealSection>
          <Box className="home-template__benefits-grid">
            {benefitsData.map((b, i) => (
              <RevealSection key={i} delay={i * 100}>
                <Box className="home-template__benefit-card">
                  <Box className="home-template__card-icon">{b.icon}</Box>
                  <Typography variant="h6" className="home-template__benefit-title">{b.title}</Typography>
                  <Typography variant="body2" className="home-template__card-desc">{b.desc}</Typography>
                </Box>
              </RevealSection>
            ))}
          </Box>
        </Container>
      </Box>

      {/* ── HOW IT WORKS ────────────────────────────────────────────── */}
      <Container maxWidth="xl" className="home-template__section-container">
        <RevealSection>
          <Typography variant="h4" className="home-template__section-heading">
            {CONTENT.howItWorks.title}
          </Typography>
        </RevealSection>
        <Box className="home-template__how-stack">
          <Box className="home-template__how-line" />
          {CONTENT.howItWorks.steps.map((step, i) => (
            <RevealSection key={i} delay={i * 120} style={{ zIndex: 1, width: "100%" }}>
              <Box className="home-template__how-step">
                <Box className="home-template__how-circle">
                  {i + 1}
                </Box>
                <Typography variant="h6" className="home-template__how-title">
                  {step}
                </Typography>
              </Box>
            </RevealSection>
          ))}
        </Box>
      </Container>

      {/* ── PORTAL FEATURES ─────────────────────────────────────────── */}
      <Box className="home-template__features-section">
        <Container maxWidth="xl">
          <RevealSection>
            <Typography variant="h4" className="home-template__section-heading">
              {CONTENT.features.title}
            </Typography>
          </RevealSection>
          <Box className="home-template__features-grid">
            {featuresData.map((f, i) => (
              <RevealSection key={i} delay={i * 80}>
                <Box className="home-template__feature-card">
                  <Box className="home-template__feature-icon">{f.icon}</Box>
                  <Box>
                    <Typography variant="h6" className="home-template__feature-title">{f.title}</Typography>
                    <Typography variant="body2" className="home-template__card-desc">{f.desc}</Typography>
                  </Box>
                </Box>
              </RevealSection>
            ))}
          </Box>
        </Container>
      </Box>

      {/* ── API CATEGORIES ──────────────────────────────────────────── */}
      <Container maxWidth="xl" className="home-template__section-container">
        <RevealSection>
          <Typography variant="overline" className="home-template__cats-overline">
            {CONTENT.categories.overline}
          </Typography>
          <Typography variant="h3" className="home-template__cats-title">
            {CONTENT.categories.title}
          </Typography>
        </RevealSection>
        <Box className="home-template__cats-grid">
          {apiCatalog.map((m: ApiModule, i: number) => (
            <RevealSection key={m.id} delay={i * 80} className="home-template__cat-card-container">
              <Box
                component={RouterLink}
                to="/api-products"
                className="home-template__cat-card"
              >
                <Typography className="home-template__cat-count">
                  {m.apis.length} {m.apis.length === 1 ? CONTENT.categories.endpointSingular : CONTENT.categories.endpointPlural}
                </Typography>
                <Typography variant="h6" className="home-template__cat-name">
                  {m.name}
                </Typography>
                <Typography variant="body2" className="home-template__cat-desc">
                  {m.description}
                </Typography>
                <Box className="home-template__cat-explore">
                  {CONTENT.categories.exploreBtn} <Box component="span" className="home-template__cat-explore-arrow">→</Box>
                </Box>
              </Box>
            </RevealSection>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
