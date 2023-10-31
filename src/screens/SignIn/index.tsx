import React, { useRef } from "react";
import { VStack, Image, Text, Center, Heading, ScrollView } from "native-base";
import BackGround from "@assets/background.png";
import Logo from "@assets/logo.svg";
import Input from "@components/Input";
import Button from "@components/Button";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigationProps } from "@routes/auth.routes";

const SignIn: React.FC = () => {
  const passwordRef = useRef<any>(null);

  const navigation = useNavigation<AuthNavigationProps>();
  const handleInput2Submit = () => {
    // Lide com a submissão do segundo input aqui.
  };
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <VStack flex={1}  px={10} pb={16}>
        <Image
          source={BackGround}
          alt="Pessoas treinando"
          resizeMode="contain"
          position={"absolute"}
          defaultSource={BackGround}
        />
        <Center my={24}>
          <Logo />
          <Text color="gray.100" fontSize="sm">
            Treine sua mente e seu corpo
          </Text>
        </Center>
        <Center>
          <Heading color="gray.100" fontSize="xl" fontFamily={"heading"} mb={6}>
            Acesse sua conta{" "}
          </Heading>
          <Input
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
            returnKeyType="next"
            onSubmitEditing={() => {
              passwordRef?.current?.focus();
            }}
          />
          <Input
            placeholder="Senha"
            secureTextEntry
            ref={passwordRef}
            returnKeyType="done"
            onSubmitEditing={handleInput2Submit}
          />
          <Button title="Acessar" />
        </Center>
        <Center mt={24}>
          <Text color="gray.100" fontSize={"sm"} mb={3} fontFamily={"body"}>
            Ainda não tem acesso?
          </Text>
            <Button title="Criar conta" variant="outline"  onPress={() => navigation.navigate("SignUp")}/>
        </Center>
      </VStack>
    </ScrollView>
  );
};

export default SignIn;
