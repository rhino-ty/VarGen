import React from "react";
import Lottie from "react-lottie-player";
import lottieJson from "public/loading.json";

export default function Loading() {
  return <Lottie loop animationData={lottieJson} play style={{ width: 150, height: 150 }} />;
}
