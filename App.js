import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
  Easing,
} from "react-native";
import Svg, {
  G,
  Use,
  Path,
  Defs,
  LinearGradient,
  Stop,
  Circle,
} from "react-native-svg";
import { interpolatePath } from "d3-interpolate-path";
import { Feather, Entypo } from "@expo/vector-icons";

const AnimatedPath = Animated.createAnimatedComponent(Path);
const paths = [
  "M223.196 112.608C223.196 135.346 217.942 154.608 198.696 173.608C183.196 188.91 164.921 193.608 143.196 193.608C124.428 193.608 107.867 189.108 94.1958 178.108C74.3668 165.608 62.1958 138.341 62.1958 112.608C56.6958 91.1078 61.588 75.2833 76.1959 60.6078C90.6551 46.0816 116.696 33.6078 143.196 31.6078C169.196 27.6078 188.065 43.9465 202.696 63.1078C213.148 76.7963 223.196 93.9667 223.196 112.608Z",
  "M222.196 113.342C227.5 137.234 217.595 161.638 195.5 177.234C178.5 189.234 167.225 195.234 145.5 195.234C126.732 195.234 107.671 191.234 94 180.234C74.1709 167.734 60 138.967 60 113.234C65 91.2345 60.588 76.0178 75.1959 61.3423C88.5 44.7345 115.696 34.3423 142.196 32.3423C168.5 25.7345 187.065 44.681 201.696 63.8423C212.148 77.5308 222.196 94.7012 222.196 113.342Z",
  "M222.628 113.377C220.432 137.035 224.932 146.035 195.932 177.269C181.773 192.518 167.657 195.269 145.932 195.269C127.932 189.035 108.103 191.269 94.4319 180.269C74.6028 167.769 68.9319 140.035 60.4319 113.269C54.3074 93.9838 69.4318 72.0347 75.6277 61.377C88.9319 44.7692 116.128 34.377 142.628 32.377C168.932 25.7692 193.432 44.0347 202.128 63.877C212.58 77.5655 222.628 94.7359 222.628 113.377Z",
  "M221.473 113.162C219.277 136.819 219.345 142.785 194.777 177.054C182.652 193.966 167.345 193.285 144.777 195.054C124.407 196.651 106.948 191.054 93.2767 180.054C73.4477 167.554 61.3449 140.785 59.2767 113.054C57.7718 92.8755 62.3448 70.2847 74.4726 61.1617C87.7767 44.5539 114.973 34.1618 141.473 32.1617C164.345 30.4355 191.357 42.6339 200.972 63.6617C208.345 79.7847 215.345 94.7847 221.473 113.162Z",
  "M224.141 113.367C221.802 137.123 225.801 139.218 199.641 173.63C186.731 190.612 174.524 193.93 150.493 195.707C128.804 197.31 113.641 189.13 95.6562 180.645C74.5423 168.093 64.8427 140.976 62.6406 113.13C60.8304 90.2395 62.227 72.9304 75.1405 63.7695C89.3067 47.0928 118.758 34.1472 146.975 32.1388C171.329 30.4054 190.043 45.1298 203.733 63.7696C214.383 78.2714 217.616 94.9134 224.141 113.367Z",
];
export default function App(props) {
  const [animatedValue, setAnimatedValue] = React.useState(
    new Animated.Value(0)
  );

  const [index, setIndex] = React.useState(0);
  const [play, setPlay] = React.useState(false);
  const animatedPathRef = React.createRef();

  function animate(i) {
    let start = i;
    let end = i + 1;
    if (end >= paths.length) {
      end = 0;
    }

    var pathInterpolator = interpolatePath(paths[start], paths[end]);
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();

    if (
      animatedPathRef.current !== null ||
      animatedPathRef.current !== undefined
    ) {
      animatedValue.addListener((props) => {
        const pathString = pathInterpolator(props.value);

        animatedPathRef?.current?.setNativeProps({
          d: pathString,
        });
        if (props.value >= 1) {
          setAnimatedValue(new Animated.Value(0));
          setIndex(end);
        }
      });
    }
  }
  React.useEffect(() => {
    if (play) {
      animate(index);
    } else {
      animatedValue.stopAnimation((props) => {
        setAnimatedValue(new Animated.Value(animatedValue._value));
      });
    }
  }, [index, play]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setPlay(!play)}>
        <Svg
          width={220}
          height={200}
          viewBox="0 0 285 224"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          {...props}
        >
          <Path fill="none" d="M0 0H285V224H0z" />
          <Path
            d={paths[0]}
            fill="#EC5C5D"
            stroke="#EF8D8E"
            strokeWidth={20}
            ref={animatedPathRef}
          />
        </Svg>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            width: 220,
            height: 200,
          }}
        >
          <Entypo
            name={play ? "controller-paus" : "controller-play"}
            size={30}
            color="white"
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(234,107,107,0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
});
