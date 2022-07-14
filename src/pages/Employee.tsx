import { useTranslation } from "react-i18next";

const Employee = () => {
  const { t } = useTranslation();

  return (
    <>
      <h2>Employee</h2>
      <p>{t("title")}</p>
    </>
  );
};
export default Employee;
