import React from "react";
import { VStack } from "native-base";
import ScreenHeader from "@components/ScreenHeader";

// import { Container } from './styles';

const History: React.FC = () => {
  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de exercícios" />
    </VStack>
  );
};

export default History;
