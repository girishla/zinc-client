import { FormStateMap } from "redux-form";
import { IMenu } from "./containers/Layout/menu";


export interface IRootState {
    layout: {
        menus: IMenu[];
        openViews: IMenu[];
        selectedMenuIndex: number;
        selectedMenuItem?: IMenu | null;
        selectedOpenedMenuIndex: number;
        selectedOpenedMenuItem?: IMenu | null;
        currentTheme: string;
        openSettingDrawer: boolean;
        showTabs: boolean;
        showOpenViews: boolean;
        isBoxedLayout: boolean;
    }
    route: any;
    form: FormStateMap;
    dashboard: any;
    login: any;
}
