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
            .then((json) => setData(json))
            .catch((error) => console.error(error));
    }, [data == null ? (console.log("error")) : ( dateFromAPI(data))]);

    function dateFromAPI (data){
        const temp=JSON.parse(JSON.stringify(data));
        const curentHijri = temp.data.hijri.date;
        console.log(curentHijri);
        setHijriDate(curentHijri);
    }
}
export default HijriDateService;