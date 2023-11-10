import React, { forwardRef, useMemo, useState } from "react";
import {
  Input as NativeBaseInput,
  IInputProps,
  FormControl,
  Icon,
  Box,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

interface ForwardInputProps extends IInputProps {
  errorMessage?: string | null;
  showPassword?: boolean;
  setShowPassword?: (value: boolean) => void;
  useIcon?: boolean;
}

const ForwardInput = forwardRef((props: ForwardInputProps, ref) => {
  const { errorMessage, isInvalid, showPassword, setShowPassword, useIcon } =
    props;
  const invalid = !!errorMessage || isInvalid;

  const inputRef: any = useMemo(() => {
    return ref || null;
  }, [ref]);

  return (
    <FormControl isInvalid={invalid} mb={4}>
      <NativeBaseInput
        bg="gray.700"
        h={14}
        borderWidth={0}
        fontSize={"md"}
        fontFamily="body"
        color="white"
        isInvalid={invalid}
        placeholderTextColor={"gray.300"}
        _invalid={{ borderColor: "red.500", borderWidth: 1 }}
        _focus={{ bg: "gray.700", borderWidth: 1, borderColor: "green.500" }}
        ref={inputRef}
        {...props}
        InputRightElement={
          <>
            {useIcon && (
              <Box mr={6}>
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Icon
                    as={Ionicons}
                    name={showPassword ? "eye-outline" : "eye-off-outline"}
                    color="gray.300"
                    size={8}
                  />
                </TouchableOpacity>
              </Box>
            )}
          </>
        }
      />
      <FormControl.ErrorMessage>{errorMessage}</FormControl.ErrorMessage>
    </FormControl>
  );
});

export default ForwardInput;
