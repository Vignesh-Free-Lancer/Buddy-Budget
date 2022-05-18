import LocalizedStrings from "react-localization";
import localization from "../i18n";
import { useLanguageContext } from "../context/languageContext";

export default function useTranslation() {
  const { language } = useLanguageContext();
  let translation = new LocalizedStrings(localization);

  translation.setLanguage(language);
  return translation;
}
