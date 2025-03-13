import * as React from "react";
import Svg, { Path } from "react-native-svg";

function HomeIcon({ fill = "#000", ...props }) {
  return (
    <Svg
      width="800px"
      height="800px"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 0L0 6v2h1v7h3v-5h3v5h8V8h1V6l-2-1.5V1h-3v1.25L8 0zm1 10h3v3H9v-3z"
        fill={fill} // Use the `fill` prop here
      />
    </Svg>
  );
}

export default HomeIcon;