import { Center, Spinner } from 'native-base';
import React from 'react';




const Loading: React.FC = () => {
  return (
    <Center flex={1} bg="gray.700">
      <Spinner/>;
    </Center>
  )
}

export default Loading;