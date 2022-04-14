import moment from "moment";
import 'moment/locale/fr';
moment.locale('fr');
      
      const listEventsAprem = [
        {
          event_ext : true,
          event_theme : "emploi",
          event_day : moment("13/04/2022", "DD-MM-YYYY").format("ddd DD MMM"),
          event_name : "ICI UN EVENEMENT",
          event_hours : "17h - 20h",
          event_place : "FAIA CREIL",
          event_adress : "3 rue Saint Martin, CHAMBLY",
        }
      ];
export default listEventsAprem;