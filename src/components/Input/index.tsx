import React, { forwardRef, useMemo } from "react";
import {
  Input as NativeBaseInput,
  IInputProps,
  FormControl,
} from "native-base";

interface ForwardInputProps extends IInputProps {
  errorMessage?: string | null;
}
const ForwardInput = forwardRef((props: ForwardInputProps, ref) => {
  const { errorMessage, isInvalid } = props;
  const invalid = !!errorMessage || isInvalid;

  const inputRef: any = useMemo(() => {
    return ref || null;
  }, [ref]);
  console.log("errorMessage: ", errorMessage);

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
      />
      <FormControl.ErrorMessage>{errorMessage}</FormControl.ErrorMessage>
    </FormControl>
  );
});

export default ForwardInput;
