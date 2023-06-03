/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const frameworksSlice = createSlice({
  name: 'frameworks',
  initialState: {
    templates: [],
    battleCards: [],
    talkTracks: [],
  },
  reducers: {
    setBattleCards: (state, action) => {
      state.battleCards = action.payload;
    },
    setTemplates: (state, action) => {
      state.templates = action.payload;
    },
    setTalkTracks: (state, action) => {
      state.talkTracks = action.payload;
    },
  },
});

export const {
  setBattleCards,
  setTemplates,
  setTalkTracks,
} = frameworksSlice.actions;

export default frameworksSlice.reducer;
