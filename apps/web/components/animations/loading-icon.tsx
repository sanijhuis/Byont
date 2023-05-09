import Animation from "./Dynamic Dashboard-Icon-Lottie-Render.json";
import Lottie from "lottie-react";

const LoadingIcon = () => {
  return (
    <div className="flex">
      <Lottie
        style={{
          height: "100%",
          width: "150px",
          margin: "auto",
        }}
        animationData={Animation}
        loop={true}
      />
    </div>
  );
};

export default LoadingIcon;
