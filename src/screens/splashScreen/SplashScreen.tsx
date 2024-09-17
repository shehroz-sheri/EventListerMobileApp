import { StatusBar, Animated } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useSplashScreenAnimation } from "./useSplashScreen";
import { colors } from "../../constants/colors";
import { styles } from "./SplashScreenStyles";

const SplashScreen: React.FC = () => {
  const { textElements } = useSplashScreenAnimation();

  return (
    <LinearGradient
      colors={[colors.darkPrimary, colors.primary]}
      style={styles.container}
    >
      <StatusBar
        backgroundColor={colors.darkPrimary}
        barStyle="light-content"
      />

      {textElements?.map(({ content, style, opacity, scale }, index) => (
        <Animated.Text
          key={index}
          style={[
            style,
            {
              opacity,
              transform: [{ scale }],
            },
          ]}
        >
          {content}
        </Animated.Text>
      ))}
    </LinearGradient>
  );
};

export default SplashScreen;
