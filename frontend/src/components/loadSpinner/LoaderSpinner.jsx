import React from "react";
import { TailSpin } from "react-loader-spinner";
import styles from "./LoaderSpinner.module.css";

const LoaderSpinner = ({ text }) => {
  return (
    <div className=" flex flex-col mt-6  h-36  justify-around items-center">
      <div className=" text-lg text-center ">{text}</div>
      <div className={styles.spinnerWrapper}>
        <TailSpin
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="tail-spin-loading"
          radius="1"
          visible={true}
        />
      </div>
    </div>
  );
};

export default LoaderSpinner;
