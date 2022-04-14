import moment from "moment";
import 'moment/locale/fr'
moment.locale('fr')

const listEventsMatin = [
    {
      event_ext : false,
      event_theme : "emploi",
      event_day : moment("13/04/2022", "DD-MM-YYYY").format("ddd DD MMM"),
      event_name : "ICI UN EVENEMENT",
      event_descrip : "",
      event_hours : "10h - 12h",
      event_place : "FAIENCERIE",
      event_adress : "CREIL",
      event_consref : "HENIN E.",
    },
    {
      event_ext : false,
      event_theme : "emploi",
      event_day : moment("15/04/2022", "DD-MM-YYYY").format("ddd DD MMM"),
      event_name : "ICI UN AUTRE EV",
      event_descrip : "",
      event_hours : "10h - 12h",
      event_place : "FAIA CREIL",
      event_adress : "3 rue Saint Martin",
      event_consref : "HENIN E.",
    },
    {
      event_ext : false,
      event_theme : "logement",
      event_day : moment("14/04/2022", "DD-MM-YYYY").format("ddd DD MMM"),
      event_name : "ICI UN AUTRE EV",
      event_descrip : "Forum emploi 5 euros venez nombreux",
      event_hours : "10h - 12h",
      event_place : "FAIA CREIL",
      event_adress : "60100 CREIL",
      event_consref : "HENIN E.",
    },
    {
      event_ext : false,
      event_theme : "mobilité",
      event_day : moment("13/04/2022", "DD-MM-YYYY").format("ddd DD MMM"),
      event_name : "ICI UN EVENEMENT",
      event_descrip : "",
      event_hours : "11h - 12h",
      event_place : "F",
      event_adress : "NOGENT SUR OISE",
      event_consref : "HENIN E.",
    }
  ];

  export default listEventsMatin;