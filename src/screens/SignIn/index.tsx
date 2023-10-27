import React, { useRef } from 'react';
import {VStack, Image, Text, Center, Heading, Input as NativeBaseInput} from 'native-base'
import BackGround from "@assets/background.png";
import Logo from  "@assets/logo.svg";
import Input from '@components/Input';


const SignIn: React.FC = () => {
  const emailRef = useRef<any>(null);
  const passwordRef = useRef<any>(null);

 

  const handleInput2Submit = () => {
    // Lide com a submissão do segundo input aqui.
  }
  return (
    <VStack flex={1} bg="gray.700" px={10}>
      <Image source={BackGround}
         alt="Pessoas treinando" 
         resizeMode='contain'
         position={'absolute'}
      />
      <Center  my={24}>
        <Logo/>
           <Text  color="gray.100" fontSize="sm">
            Treine sua mente e seu corpo
          </Text>
      </Center>
      <Center>
        <Heading color="gray.100" fontSize="xl" fontFamily={"heading"}>Acesse sua conta </Heading>
      </Center>
      <Input placeholder="E-mail"
        keyboardType='email-address'
        autoCapitalize='none'
       
        returnKeyType="next"
        onSubmitEditing={() => {
          passwordRef?.current?.focus();
        }}
      />
      <Input placeholder="Senha"
        secureTextEntry
        ref={passwordRef}
        returnKeyType="done"
        onSubmitEditing={handleInput2Submit}
      />

    </VStack>
  )
}

export default SignIn;