import { create } from 'zustand'

export const useStore = create(set => ({
  prayerTimes: 0,
  setPrayerTimes: inputPrayerTimes => set({ prayerTimes: inputPrayerTimes}),
  removePrayerTimes: () => set({ prayerTimes: 0 }),
  notificationActive: false,
  setNotificationActive: inputNotificationActive => set({ notificationActive: inputNotificationActive}),
  loading: true,
  setLoading: inputLoading => set({ loading: inputLoading}),
  hijriDate: 0,
  setHijriDate: inputDate => set({ hijriDate: inputDate}),
}));