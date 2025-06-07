import type { ReactNode } from "react";

const Container = ({
  isCenter = false,
  children,
}: {
  isCenter: boolean;
  children: ReactNode;
}) => {
  return (
    <div
      className={` ${
        isCenter ? "flex  justify-center" : "block"
      }`}
    >
      {children}
    </div>
  );
};

export default Container;
