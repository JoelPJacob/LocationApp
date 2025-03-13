import * as React from "react";
import Svg, { Path } from "react-native-svg";

function LocationIcon({ fill = "#000", ...props }) {
  return (
    <Svg
      width="800px"
      height="800px"
      viewBox="-4 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M118 422a3 3 0 100 6 3 3 0 000-6zm0 8a5 5 0 110-10 5 5 0 010 10zm0-17c-6.627 0-12 5.373-12 12 0 5.018 10.005 20.011 12 20 1.964.011 12-15.05 12-20 0-6.627-5.373-12-12-12z"
        transform="translate(-106 -413)"
        fill={fill} // Use the `fill` prop here
        stroke="none"
        strokeWidth={1}
        fillRule="evenodd"
      />
    </Svg>
  );
}

export default LocationIcon;