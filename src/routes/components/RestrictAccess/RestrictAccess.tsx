import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const RestrictAccess = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h1>{t("default.restrictAccessTitle")}</h1>
      <p>{t("default.restrictAccessText")}</p>
      <Link to="/">
        <button>{t("default.notFoundBackHomeButton")}</button>
      </Link>
    </div>
  );
};

export default RestrictAccess;
