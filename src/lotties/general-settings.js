export default function generalLottieSettings(jsonFile) {
  return {
    loop: true,
    autoplay: true,
    animationData: jsonFile,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  }
}