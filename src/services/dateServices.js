
const date = new Date(); 
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


export const currentDate = date.getDate()
export const currentMonth = months[date.getMonth()]
export const currentMonthNumber = date.getMonth()+1
export const currentYear = date.getFullYear()