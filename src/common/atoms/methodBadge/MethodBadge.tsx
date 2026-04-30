import { type FC } from "react";
import { Chip } from "@mui/material";
import { HttpMethod } from "@/common/enums";

const COLOR: Record<HttpMethod, string> = {
  [HttpMethod.GET]: "#155686",
  [HttpMethod.POST]: "#e15325",
  [HttpMethod.PUT]: "#a16207",
  [HttpMethod.DELETE]: "#b91c1c",
  [HttpMethod.PATCH]: "#0f766e",
};

interface MethodBadgeProps {
  method: HttpMethod;
  size?: "small" | "medium";
}

const MethodBadge: FC<MethodBadgeProps> = ({ method, size = "small" }) => {
  return (
    <Chip
      label={method}
      size={size}
      sx={{
        bgcolor: COLOR[method],
        color: "#fff",
        fontWeight: 700,
        letterSpacing: 0.5,
        borderRadius: 1,
        px: 0.5,
      }}
    />
  );
};

export default MethodBadge;
