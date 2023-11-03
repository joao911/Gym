import React from "react";
import { Image, IImageProps } from "native-base";

interface IUserPhotoProps extends IImageProps {
  size?: number;
}
const UserPhoto: React.FC<IUserPhotoProps> = ({ size, ...rest }) => {
  return (
    <Image
      w={size}
      h={size}
      rounded="full"
      borderWidth={2}
      borderColor="gray.400"
      {...rest}
    />
  );
};

export default UserPhoto;
