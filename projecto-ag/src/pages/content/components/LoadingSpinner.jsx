import React from "react";
import { css } from "@emotion/react";
import { BarLoader } from "react-spinners";

const LoadingSpinner = () => {
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  return (
    <div className="loading-spinner">
      <BarLoader color={"#123abc"} css={override} size={150} />
    </div>
  );
};

export default LoadingSpinner;
