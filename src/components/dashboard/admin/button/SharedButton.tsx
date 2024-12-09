import React, { CSSProperties, FC } from "react";
import { Button, Typography } from "antd";

import { themeConstants } from "@/constants/theme";
import { c } from "@/utils/string";

type ButtonProps = {
  title?: string;
  customSize?: "sm" | "md" | "lg";
  customType?: "primary" | "action" | "danger" | "secondary";
  disabled?: boolean;
  customTextStyles?: CSSProperties;
} & React.ComponentProps<typeof Button>;

const SharedButton: FC<ButtonProps> = ({
  children,
  title,
  customSize = "md",
  customType = "primary",
  disabled = false,
  style,
  customTextStyles,
  ...props
}) => {
  return (
    <Button
      type="primary"
      style={{
        ...getButtonStyle(customSize, customType, disabled),
        ...style,
      }}
      disabled={disabled}
      {...props}
    >
      {title ? (
        <Typography
          style={{
            fontSize: 18,
            fontWeight: 600,
            color: themeConstants.btnTextDefault,
            lineHeight: "16px",
            ...customTextStyles,
          }}
        >
          {c(title)}
        </Typography>
      ) : (
        children
      )}
    </Button>
  );
};

export default SharedButton;

const getButtonStyle = (
  size: string,
  type: string,
  disabled: boolean
): CSSProperties => {
  const buttonStyle: CSSProperties = {
    height: 40,
    width: "fit-content",
    minWidth: 120,
    padding: "12px 16px",
    backgroundColor: themeConstants.btnPrimaryDefault,
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    borderRadius: 4,
  };
  switch (type) {
    case "action":
      buttonStyle.backgroundColor = disabled
        ? themeConstants.btnActionDisabled
        : themeConstants.btnActionDefault;
      break;
    case "danger":
      buttonStyle.backgroundColor = disabled
        ? themeConstants.btnPrimaryDisabled
        : themeConstants.btnDangerDefault;
      break;
    case "secondary":
      buttonStyle.backgroundColor = disabled
        ? themeConstants.btnPrimaryDisabled
        : themeConstants.btnSecondaryDefault;
      break;
    default:
      buttonStyle.backgroundColor = disabled
        ? themeConstants.btnPrimaryDisabled
        : themeConstants.btnPrimaryDefault;
  }
  switch (size) {
    case "sm":
      buttonStyle.height = 40;
      buttonStyle.fontWeight = 600;
      buttonStyle.lineHeight = "16px";
      break;
    case "md":
      buttonStyle.height = 40;
      buttonStyle.fontWeight = 600;
      buttonStyle.lineHeight = "16px";
      break;
    case "lg":
      buttonStyle.height = 48;
      buttonStyle.fontWeight = 700;
      buttonStyle.lineHeight = "18px";
      break;
    default:
      buttonStyle.height = 40;
      buttonStyle.fontWeight = 600;
      buttonStyle.lineHeight = "16px";
  }
  return { ...buttonStyle };
};
