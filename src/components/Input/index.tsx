import React, { useMemo } from 'react';
import { Input as NativeBaseInput, IInputProps } from 'native-base';

interface InputProps extends IInputProps {
  [x: string]: any;
}

const Input: React.FC<InputProps> = React.forwardRef(
  (
    {
      
      ...props
    },
    ref,
  ) => {
    const inputRef: any = useMemo(() => {
      return ref || null;
    }, [ref]);

    return (
      <NativeBaseInput
        bg="gray.700"
        h={14}
        borderWidth={0}
        fontSize={"md"}
        fontFamily="body"
        color="white"
        mb={4}
        placeholderTextColor={"gray.300"}
        _focus={{bg: "gray.700",
                borderWidth: 1,
                borderColor: "green.500",
        }}
      ref={inputRef}
      {...props}
      /> 
    );
  },
);

export default Input;


