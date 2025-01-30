import { createSlice } from "@reduxjs/toolkit";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const calculateTimeLeft = (targetDate: number): TimeLeft => {
  const now = Date.now();
  const difference = targetDate - now;

  return {
    days: Math.max(Math.floor(difference / (1000 * 60 * 60 * 24)), 0),
    hours: Math.max(Math.floor((difference / (1000 * 60 * 60)) % 24), 0),
    minutes: Math.max(Math.floor((difference / (1000 * 60)) % 60), 0),
    seconds: Math.max(Math.floor((difference / 1000) % 60), 0),
  };
};

const targetDate = Date.now() + 6 * 24 * 60 * 60 * 1000;

const initialState: TimeLeft = calculateTimeLeft(targetDate);

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    updateTimeLeft(state) {
      return calculateTimeLeft(targetDate);
    },
  },
});

export const { updateTimeLeft } = timerSlice.actions;
export default timerSlice.reducer;
