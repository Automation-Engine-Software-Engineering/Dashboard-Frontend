const convertToJalali = (dateString: string): string => {
  const date = new Date(dateString);

  const formatter = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });

  return formatter.format(date).replace(/-/g, "/");
};

export default convertToJalali;
