// SwipeContext.js — Global state for tracking food swipe choices
import React, { createContext, useContext, useReducer } from "react";

const SwipeContext = createContext();

const initialState = {
  currentIndex: 0,
  liked: [],       // swiped right
  disliked: [],    // swiped left
  superLiked: [],  // swiped up
  unsure: [],      // swiped down
  completed: false,
};

function swipeReducer(state, action) {
  switch (action.type) {
    case "SWIPE_RIGHT":
      return {
        ...state,
        liked: [...state.liked, action.payload],
        currentIndex: state.currentIndex + 1,
      };
    case "SWIPE_LEFT":
      return {
        ...state,
        disliked: [...state.disliked, action.payload],
        currentIndex: state.currentIndex + 1,
      };
    case "SWIPE_UP":
      return {
        ...state,
        superLiked: [...state.superLiked, action.payload],
        currentIndex: state.currentIndex + 1,
      };
    case "SWIPE_DOWN":
      return {
        ...state,
        unsure: [...state.unsure, action.payload],
        currentIndex: state.currentIndex + 1,
      };
    case "UNDO": {
      if (state.currentIndex === 0) return state;
      const newIndex = state.currentIndex - 1;
      return {
        ...state,
        currentIndex: newIndex,
        liked: state.liked.filter((f) => f.id !== action.payload.id),
        disliked: state.disliked.filter((f) => f.id !== action.payload.id),
        superLiked: state.superLiked.filter((f) => f.id !== action.payload.id),
        unsure: state.unsure.filter((f) => f.id !== action.payload.id),
      };
    }
    case "COMPLETE":
      return { ...state, completed: true };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

export function SwipeProvider({ children }) {
  const [state, dispatch] = useReducer(swipeReducer, initialState);

  return (
    <SwipeContext.Provider value={{ state, dispatch }}>
      {children}
    </SwipeContext.Provider>
  );
}

export function useSwipeContext() {
  const context = useContext(SwipeContext);
  if (!context) {
    throw new Error("useSwipeContext must be used within SwipeProvider");
  }
  return context;
}
