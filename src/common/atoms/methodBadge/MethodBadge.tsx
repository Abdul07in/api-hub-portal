import { type FC } from "react";
import { Chip } from "@mui/material";
import { HttpMethod } from "@/common/enums";
import "./MethodBadge.scss";

interface MethodBadgeProps {
  method: HttpMethod;
  size?: "small" | "medium";
}

const MethodBadge: FC<MethodBadgeProps> = ({ method, size = "small" }) => {
  return (
    <Chip
      label={method}
      size={size}
      className={`method-badge method-badge--${method.toLowerCase()}`}
    />
  );
};

export default MethodBadge;
