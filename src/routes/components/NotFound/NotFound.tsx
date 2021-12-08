import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h1>{t("default.notFoundTitle")}</h1>
      <p>{t("default.notFoundText")}</p>
      <Link to="/">
        <button>{t("default.notFoundBackHomeButton")}</button>
      </Link>
    </div>
  );
};

export default NotFound;
