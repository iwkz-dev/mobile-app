import React, { useEffect } from 'react';
import { useStore } from '../utils/state';
import { url } from '../utils/config';
function PrayerTimeService() {

    const setData = useStore(state => state.setPrayerTimes);
    const setLoading = useStore(state => state.setLoading);

    useEffect(() => {
        fetch(url)
            .then((resp) => resp.json())
            .then((json) => setData(json))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);

}

export default PrayerTimeService;