import React from "react";
import { Text, Pressable, IPressableProps } from "native-base";

interface IGroupProps extends IPressableProps {
  name: string;
  isActive: boolean;
}
const Group: React.FC<IGroupProps> = ({ name, isActive, ...rest }) => {
  return (
    <Pressable
      mr={3}
      w={24}
      h={10}
      rounded={"md"}
      bg="gray.600"
      justifyContent={"center"}
      alignItems={"center"}
      overflow={"hidden"}
      isPressed={isActive}
      _pressed={{ borderColor: "green.500", borderWidth: 1 }}
      {...rest}
    >
      <Text
        color={isActive ? "green.500" : "gray.200"}
        textTransform={"uppercase"}
        fontSize={"xs"}
        fontWeight={"bold"}
      >
        {name}
      </Text>
    </Pressable>
  );
};

export default Group;
