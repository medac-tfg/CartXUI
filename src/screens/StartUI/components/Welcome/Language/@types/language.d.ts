export type LanguageProps = {
  title: string;
  code: string;
  flag: string | JSX.Element;
  active: boolean;
  handleLanguage: (title: string, code: string) => void;
};