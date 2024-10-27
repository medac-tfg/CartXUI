// eslint-disable-next-line import/no-unresolved
import { LanguageProps } from "./@types/language";

const Language = ({ title, flag, active, handleLanguage }: LanguageProps) => {
  return (
    <div
      className="welcome__language"
      style={{ border: active ? "1px solid #C6CACD" : "1px solid transparent" }}
      onClick={() => handleLanguage(title)}
    >
      <span className="welcome__language-flag">{flag}</span>
      <span className="welcome__language-title">{title}</span>
    </div>
  );
};

export default Language;
