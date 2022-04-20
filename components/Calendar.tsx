import { useState } from "react";
import { LocaleConfig } from "react-native-calendars";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";

LocaleConfig.locales["fr"] = {
  monthNames: [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ],
  monthNamesShort: [
    "Janv.",
    "Févr.",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juil.",
    "Août",
    "Sept.",
    "Oct.",
    "Nov.",
    "Déc.",
  ],
  dayNames: [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ],
  dayNamesShort: ["Dim.", "Lun.", "Mar.", "Mer.", "Jeu.", "Ven.", "Sam."],
  today: "Aujourd'hui",
};
LocaleConfig.defaultLocale = "fr";

let dateFormat = () => {
  return new Date();
};

// let _renderArrow = (direction) => {
//   if(direction === 'left') {
//       return <Text>{this.state.previousMonth}</Text>
//   } else {
//       return <Text>{this.state.nextMonth}</Text>
//   }
// }

let left = () => {
  return "left";
};

export default function CalendarComp() {
  const [date, setDate] = useState([]);
  return (
    <Calendar
      markedDates={{
        "2022-04-15": { selected: true, marked: true, selectedColor: "blue" },
        "2022-04-14": { marked: true },
        "2022-04-13": { marked: true, dotColor: "red", activeOpacity: 0 },
        "2022-04-12": { disabled: true, disableTouchEvent: true },
      }}
      hideArrows={false}
      // renderArrow={left}
      theme={{
        backgroundColor: "#ffffff",
        calendarBackground: "#ffffff",
        textSectionTitleColor: "#b6c1cd",
        textSectionTitleDisabledColor: "#d9e1e8",
        selectedDayBackgroundColor: "#00adf5",
        selectedDayTextColor: "#ffffff",
        todayTextColor: "#00adf5",
        dayTextColor: "#2d4150",
        textDisabledColor: "#d9e1e8",
        dotColor: "#00adf5",
        selectedDotColor: "#ffffff",
        arrowColor: "#b6c1cd",
        disabledArrowColor: "#d9e1e8",
        monthTextColor: "blue",
        indicatorColor: "blue",
        // textDayFontFamily: 'monospace',
        // textMonthFontFamily: 'monospace',
        // textDayHeaderFontFamily: 'monospace',
        textDayFontWeight: "300",
        textMonthFontWeight: "bold",
        textDayHeaderFontWeight: "300",
        textDayFontSize: 16,
        textMonthFontSize: 16,
        textDayHeaderFontSize: 16,
      }}
    ></Calendar>
  );
}
