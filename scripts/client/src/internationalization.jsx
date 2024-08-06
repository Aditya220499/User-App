import React from "react";
import { IntlProvider, FormattedMessage } from "react-intl";
import mr from "./translations/mr";
import hi from "./translations/hi";
import en from "./translations/en-US";

const getLanguage = (locale) => {
    let language;
    switch (locale) {
        case "mr":
            language = mr;
          break;
        case "hi":
            language = hi;
          break;
        case "en-US":
            language = en;
        default:
            language = en;
    }
    return language;
};

const intlLabel = (id) => {
const presentLanguages = ["mr", "hi", "en-US"];
const languagePrefrences = navigator.languages ;
const languagesPresent = languagePrefrences.filter(language => presentLanguages.includes(language));
    for(let i of languagesPresent){
        let language  = getLanguage(i)
        if(language[id])
        return (
            <IntlProvider locale={language} messages={language}>
                <FormattedMessage id={id} defaultMessage={id} />
            </IntlProvider>
        );
    }

};
export default intlLabel;
