import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

interface ITranslate  {
    from: string;
    to: string;
    input: string;
    output: string;
}

const translateSlice = createSlice({
    name: "translation",
    initialState: {
        history: [] as ITranslate[],
    },
    reducers: {
        addTranslation: (state, action: PayloadAction<ITranslate>) => {
            state.history.push(action.payload);
        },
        clearHistory: (state) => {
            state.history = [];
        },
    },
});

export const { addTranslation, clearHistory } = translateSlice.actions;

const store = configureStore({
    reducer: {
        translation: translateSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
