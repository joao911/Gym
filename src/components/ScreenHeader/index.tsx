import React from "react";
import { Center, Heading } from "native-base";

interface ScreenHeaderProps {
  title: string;
}
const ScreenHeader: React.FC<ScreenHeaderProps> = ({ title }) => {
  return (
    <Center bg="gray.600" pb={6} pt={16}>
      <Heading color="gray.100" fontSize="xl">
        {title}
      </Heading>
    </Center>
  );
};

export default ScreenHeader;
