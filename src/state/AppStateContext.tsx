import { createContext, Dispatch, useContext, FC } from "react";
import { appStateReducer, AppState, List, Task } from "./AppStateReducer";
import { Action } from "./actions";
import { useImmerReducer } from "use-immer";
import { DragItem } from "../DragItem";


const AppStateContext = createContext<AppStateContextProps>({} as AppStateContextProps);

const appData: AppState = {
    draggedItem: null,
    lists: [
        {
            id: "0",
            text: "To Do",
            tasks: [{ id: "c0", text: "Generate app scaffold" }]
        },
        {
            id: "1",
            text: "In Progress",
            tasks: [{ id: "c2", text: "Learn Typescript" }]
        }
    ]
};

type AppStateContextProps = {
    draggedItem: DragItem | null;
    lists: List[];
    getTasksByListId(id: string): Task[];
    dispatch: Dispatch<Action>;
}


export const AppStateProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useImmerReducer(appStateReducer, appData);
    const { draggedItem,lists } = state;

    const getTasksByListId = (id: string) => {
        return lists.find((list) => list.id === id)?.tasks || [];
    };
    return (
        <AppStateContext.Provider value={{draggedItem, lists, getTasksByListId,dispatch }}>
            {children}
        </AppStateContext.Provider>
    )
}

export const useAppState = () => {
    return useContext(AppStateContext);
}
