import { useEffect, useState } from "react";
import { hijriConvertURL } from "../utils/config";
import { useStore } from "../utils/state";
import { currentDate, currentMonthNumber, currentYear } from "./dateServices";
function HijriDateService (){

    const setHijriDate = useStore(state => state.setHijriDate);
    const [data, setData] = useState();
    useEffect(() => {
        fetch(`${hijriConvertURL}/${currentDate}-${currentMonthNumber}-${currentYear}`)
            .then((resp) => resp.json())
            .then((json) => setHijriDate(json.data.hijri.date))
            .catch((error) => console.error(error));
    }, []);

}
export default HijriDateService;