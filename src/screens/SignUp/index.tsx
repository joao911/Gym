import React, { useRef } from "react";
import { VStack, Image, Text, Center, Heading, ScrollView } from "native-base";
import BackGround from "@assets/background.png";
import Logo from "@assets/logo.svg";
import Input from "@components/Input";
import Button from "@components/Button";
import { useNavigation } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";

const SignUp: React.FC = () => {
  const nameRef = useRef<any>(null);
  const emailRef = useRef<any>(null);
  const passwordRef = useRef<any>(null);
  const confirmPasswordRef = useRef<any>(null);

  const navigation = useNavigation();

  const { control } = useForm();
  const handleInput2Submit = () => {
    // Lide com a submissão do segundo input aqui.
  };
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} px={10} pb={16}>
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
            Crie sua conta sua conta{" "}
          </Heading>
          <Controller
            name="name"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Nome"
                returnKeyType="next"
                onSubmitEditing={() => {
                  emailRef?.current?.focus();
                }}
                onChangeText={onChange}
                value={value}
                marginBottom={0}
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                returnKeyType="next"
                ref={emailRef}
                onSubmitEditing={() => {
                  passwordRef?.current?.focus();
                }}
                onChangeText={onChange}
                value={value}
                marginBottom={10}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Senha"
                secureTextEntry
                ref={passwordRef}
                returnKeyType="done"
                onSubmitEditing={confirmPasswordRef?.current?.focus()}
                onChange={onChange}
                value={value}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Confirmar senha"
                secureTextEntry
                ref={confirmPasswordRef}
                returnKeyType="done"
                onSubmitEditing={handleInput2Submit}
                onChange={onChange}
                value={value}
              />
            )}
          />

          <Button title="Criar e acessar " mt={"1.5"} />
        </Center>
        <Center mt={24}>
          <Button
            title="Voltar para login"
            variant="outline"
            onPress={() => navigation.goBack()}
          />
        </Center>
      </VStack>
    </ScrollView>
  );
};

export default SignUp;
