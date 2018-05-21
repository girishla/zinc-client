export interface IMenu {
  id: string;
  text: string;
  icon: any;
  url: string;
  index: number;
  open: boolean;
  willCloseMenu: boolean;
  animating: boolean;
  animatingRootMenu: boolean;
  willCloseRootMenu: boolean;
  children: IMenu[];
}
