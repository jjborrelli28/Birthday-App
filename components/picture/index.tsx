import Image from "next/image";
import React from "react";
import styles from "./index.module.scss";
import PictureProps from "./interfaces";

const Picture = ({ img, alt, width, heigth }: PictureProps) => {
  return (
    <picture className={styles.picture}>
      <Image src={img} alt={alt} width={width} height={heigth} />
    </picture>
  );
};

export default Picture;
