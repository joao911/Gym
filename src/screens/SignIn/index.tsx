import React, { useRef, useState } from "react";
import {
  VStack,
  Image,
  Text,
  Center,
  Heading,
  ScrollView,
  useToast,
} from "native-base";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { RootState, Dispatch } from "@store/index";

import BackGround from "@assets/background.png";
import Logo from "@assets/logo.svg";
import Input from "@components/Input";
import Button from "@components/Button";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigationProps } from "@routes/auth.routes";
import { AppError } from "@services/ultils/AppError";

interface IDataProps {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const dispatch = useDispatch<Dispatch>();
  const { loadingLogin } = useSelector((state: RootState) => state.auth);

  const toast = useToast();
  const passwordRef = useRef<any>(null);
  const [showPassword, setShowPassword] = useState(true);
  const navigation = useNavigation<AuthNavigationProps>();

  const schema = yup.object({
    email: yup.string().required("Email obrigatório").email("Email inválido"),
    password: yup.string().required("Senha obrigatória"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: IDataProps) => {
    try {
      await dispatch.auth.login(data);
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError
        ? error.message
        : "Não foi possivel entrar. Tente novamente mais tarde";
      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    }
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
            Acesse sua conta{" "}
          </Heading>

          <Controller
            name="email"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordRef?.current?.focus();
                }}
                onChangeText={onChange}
                value={value}
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Senha"
                secureTextEntry={showPassword}
                ref={passwordRef}
                returnKeyType="done"
                // onSubmitEditing={onSubmit}
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password?.message}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                useIcon
              />
            )}
          />

          <Button
            title="Acessar"
            onPress={handleSubmit(onSubmit)}
            isLoading={loadingLogin}
          />
        </Center>
        <Center mt={24}>
          <Text color="gray.100" fontSize={"sm"} mb={3} fontFamily={"body"}>
            Ainda não tem acesso?
          </Text>
          <Button
            title="Criar conta"
            variant="outline"
            onPress={() => navigation.navigate("SignUp")}
          />
        </Center>
      </VStack>
    </ScrollView>
  );
};

export default SignIn;
