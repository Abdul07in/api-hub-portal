import { useEffect, useState, Fragment, type FC } from "react";
import { Box, Typography } from "@mui/material";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";

import type { ApiModule } from "@/common/interfaces/api";

interface FlowAnimationProps {
  flowSteps?: ApiModule["flowSteps"];
}

const FlowAnimation: FC<FlowAnimationProps> = ({ flowSteps }) => {
  const steps = flowSteps ?? [];
  const totalPhases = steps.length * 2;
  const [phase, setPhase] = useState(0);
  const phaseDuration = 1200;

  useEffect(() => {
    if (steps.length === 0) {
      return undefined;
    }

    const timer = setInterval(() => {
      setPhase((previousPhase) => (previousPhase + 1) % totalPhases);
    }, phaseDuration);

    return () => clearInterval(timer);
  }, [steps.length, totalPhases]);

  const activeStepIndex = Math.floor(phase / 2);
  const isConnectorAnimating = phase % 2 === 1;

  if (steps.length === 0) {
    return <Typography sx={{ p: 2 }}>No flow steps defined.</Typography>;
  }

  return (
    <Box className="flow-animation">
      <Box
        className={`flow-animation__header ${
          activeStepIndex === 0 && !isConnectorAnimating ? "flow-animation__header--active" : ""
        }`}
      >
        <SettingsSuggestIcon sx={{ fontSize: 24, mb: 0.5 }} />
        <Typography variant="body2" sx={{ fontWeight: 700, letterSpacing: 0.5 }}>
          Partners
        </Typography>
      </Box>

      <Box className="flow-animation__down-connector">
        <svg width="2" height="32" viewBox="0 0 2 32">
          <line x1="1" y1="0" x2="1" y2="32" stroke="#c0c8d4" strokeWidth="2" />
          <line
            x1="1"
            y1="0"
            x2="1"
            y2="32"
            stroke="#e15325"
            strokeWidth="2"
            className="flow-animation__connector-line"
            style={{ opacity: activeStepIndex === 0 && !isConnectorAnimating ? 1 : 0.15 }}
          />
        </svg>
      </Box>

      <Box className="flow-animation__steps">
        {steps.map((step, index) => {
          const isActive = activeStepIndex === index && !isConnectorAnimating;
          const isCompleted =
            index < activeStepIndex || (index === activeStepIndex && isConnectorAnimating);

          return (
            <Fragment key={index}>
              <Box
                className={`flow-animation__step ${
                  isActive ? "flow-animation__step--active" : ""
                } ${isCompleted ? "flow-animation__step--completed" : ""}`}
              >
                <Box className="flow-animation__step-badge">
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 700,
                      color: isActive || isCompleted ? "#fff" : "#8a94a6",
                      fontSize: "0.65rem",
                    }}
                  >
                    STEP {index + 1}
                  </Typography>
                </Box>
                <DescriptionOutlinedIcon
                  sx={{
                    fontSize: 22,
                    mb: 0.5,
                    color: isActive ? "#e15325" : isCompleted ? "#002B5C" : "#b0b8c4",
                  }}
                />
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 700,
                    color: isActive ? "#e15325" : "#002B5C",
                    fontSize: "0.72rem",
                    lineHeight: 1.3,
                  }}
                >
                  {step.title}
                </Typography>
                <Typography
                  variant="caption"
                  className="flow-animation__step-desc"
                >
                  {step.desc}
                </Typography>
              </Box>

              {index < steps.length - 1 && (
                <Box className="flow-animation__connector">
                  <svg width="48" height="24" viewBox="0 0 48 24">
                    <line
                      x1="0"
                      y1="12"
                      x2="40"
                      y2="12"
                      stroke="#d4dae3"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <line
                      x1="0"
                      y1="12"
                      x2="40"
                      y2="12"
                      stroke="#e15325"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      className={`flow-animation__connector-fill ${
                        (activeStepIndex === index && isConnectorAnimating) || isCompleted
                          ? "flow-animation__connector-fill--animate"
                          : ""
                      }`}
                      style={{
                        opacity:
                          (activeStepIndex === index && isConnectorAnimating) || isCompleted
                            ? 1
                            : 0,
                      }}
                    />
                    <polygon
                      points="38,6 48,12 38,18"
                      fill={
                        (activeStepIndex === index && isConnectorAnimating) || isCompleted
                          ? "#e15325"
                          : "#d4dae3"
                      }
                      className="flow-animation__arrow"
                    />
                  </svg>
                </Box>
              )}
            </Fragment>
          );
        })}
      </Box>
    </Box>
  );
};

export default FlowAnimation;
