import Image from "next/image";
import React from "react";
import styles from "./index.module.scss";
import PictureProps from "./interfaces";

const Picture = ({ src, alt, width, heigth }: PictureProps) => {
  return (
    <picture className={styles.picture}>
      <Image src={src} alt={alt} width={width} height={heigth} />
    </picture>
  );
};

export default Picture;
