//Time

export const NOW = new Date();
export const START_OF_TODAY = new Date(
  NOW.getFullYear(),
  NOW.getMonth(),
  NOW.getDate()
).getTime();
export const START_OF_YESTERDAY = START_OF_TODAY - 24 * 60 * 60 * 1000;
