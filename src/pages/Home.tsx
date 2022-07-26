import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/hooks/useAuth";

const menus = [
  ["Profile", "/profile"],
  ["Count", "/count"],
  ["Undo/Redo", "/count_with_history"],
];

const Home = () => {
  const { isLoggedIn } = useAuth();
  const { t } = useTranslation();

  return (
    <>
      <h2>{t("title")}</h2>

      <p>{t("description.part1")}</p>

      <p>
        Check out the <code>src/translations/*.json</code> to see these
        translations.
      </p>

      <h3>{t("toc")}</h3>

      {!isLoggedIn && <p>{t("description.not_logged_in")}</p>}

      <ul>
        {menus.map(([label, to]) => (
          <li key={label}>
            <Link to={to}>
              <a>{label}</a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};
export default Home;
