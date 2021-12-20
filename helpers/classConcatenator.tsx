interface ObjectProps {
  condition: boolean;
  class: string;
}

export const classConcatenator = (array: ObjectProps[]) => {
  const classes = array
    .filter((item) => item.condition)
    .map((item) => item.class)
    .join(" ");

  return classes;
};

/* 
    Usage

    Declare an array with the following structure that contains the conditionals to apply the classes with the names of each of them

    Example: 
    const classes = [{condition: true, class: "button"}, {condition: false, class: "primary"}, {condition: variable, class: "border"}]
    .
    .
    .
    <button className={classConcatenator(classes)}></button>
*/
