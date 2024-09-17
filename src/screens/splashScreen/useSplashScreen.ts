import { useEffect, useRef } from "react";
import { Animated } from "react-native";
import { useNavigation } from "../../hooks/useNavigation";
import { styles } from "./SplashScreenStyles";

export const useSplashScreenAnimation = () => {
  const navigation = useNavigation();

  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleScale = useRef(new Animated.Value(0.5)).current;

  const descOpacity = useRef(new Animated.Value(0)).current;
  const descScale = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    const animate = Animated.sequence([
      Animated.parallel([
        Animated.timing(titleOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.spring(titleScale, {
          toValue: 1,
          friction: 3,
          tension: 40,
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(100),
      Animated.parallel([
        Animated.timing(descOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.spring(descScale, {
          toValue: 1,
          friction: 3,
          tension: 40,
          useNativeDriver: true,
        }),
      ]),
    ]);

    animate.start(() => {
      navigation.replace("Login");
    });
  }, [navigation, titleOpacity, titleScale, descOpacity, descScale]);

  const textElements = [
    {
      content: "EventLister",
      style: styles.title,
      opacity: titleOpacity,
      scale: titleScale,
    },
    {
      content: "Nearby Event Mobile App",
      style: styles.desc,
      opacity: descOpacity,
      scale: descScale,
    },
  ];

  return { textElements };
};
