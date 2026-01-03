// Test script for NEW week calculation logic
const testDates = [
  { date: '2024-01-01', desc: 'Monday, Start of Month' },
  { date: '2024-01-07', desc: 'Sunday, End of 1st Week' },
  { date: '2024-01-08', desc: 'Monday, Start of 2nd Week' },
];

const getDaysInMonth = (year, month) => new Date(year, month, 0).getDate();

const calculateWeeks = (dateStr) => {
    const today = new Date(dateStr);
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);

    let remainingWeeks = 1; // Always count current week
    const pointer = new Date(today);
    pointer.setDate(pointer.getDate() + 1); // Start checking from tomorrow

    const endOfMonth = new Date(currentYear, currentMonth - 1, daysInMonth);
    
    while (pointer <= endOfMonth) {
        if (pointer.getDay() === 1) { // Monday
            remainingWeeks++;
        }
        pointer.setDate(pointer.getDate() + 1);
    }
    return remainingWeeks;
}

testDates.forEach(({ date, desc }) => {
  const weeks = calculateWeeks(date);
  console.log(`Date: ${date} (${desc})`);
  console.log(`  Expected Weeks: ${weeks}`);
});
