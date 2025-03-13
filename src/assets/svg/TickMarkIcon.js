
import * as React from "react"
import Svg, { Path } from "react-native-svg"

const TickMarkIcon = (props) => (
  <Svg
    width={12}
    height={9}
    viewBox="0 0 12 9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M1 5.05263L4.2 8L11 1"
      stroke="#0D6EFD"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default TickMarkIcon
