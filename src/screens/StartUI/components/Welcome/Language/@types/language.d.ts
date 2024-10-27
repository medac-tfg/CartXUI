export type LanguageProps = {
  title: string;
  flag: string | JSX.Element;
  active: boolean;
  handleLanguage: (title: string) => void;
};