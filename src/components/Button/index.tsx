import React from "react";
import { Button as NativeBaseButton, Text, IButtonProps } from "native-base";

interface ButtonProps extends IButtonProps {
  title: string;
  variant?: "outline" | "solid";
}

const Button: React.FC<ButtonProps> = ({ title, variant = "solid", ...rest }) => {
  return (
    <NativeBaseButton
      w="full"
      h={14}
      bg={variant === "outline" ? "transparent" : "green.700"}
      borderWidth={variant === "outline" ? 1 : 0}
      borderColor={"green.500"}
      rounded="sm"
      _pressed={{ bg: variant === "outline" ? "gray.500" : "green.500" }}
      {...rest}
    >
      <Text
        color={variant === "outline" ? "green.500" : "white"}
        fontSize={"sm"}
        fontFamily={"heading"}
      >
        {title}{" "}
      </Text>
    </NativeBaseButton>
  );
};

export default Button;
