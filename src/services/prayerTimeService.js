import React, { useEffect } from 'react';
import { useStore } from '../utils/state';
import { url } from '../utils/config';
function PrayerTimeService () {

    const setData = useStore(state => state.setPrayerTimes);
    const setLoading = useStore(state => state.setLoading);
    const data = useStore(state => state.prayerTimes);

    useEffect(() => {
        fetch(url)
            .then((resp) => resp.json())
            .then((json) => setData(json))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);

    function getPrayerHour(prayerName){
        const test = data[prayerName].split(":")
        // [0] for hour [1] for minutes
        console.log(data.maghrib)
        console.log(test[0])
    }
}
export default PrayerTimeService;