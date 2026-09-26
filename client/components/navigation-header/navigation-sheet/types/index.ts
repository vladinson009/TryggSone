export type MenuTypes = 'main' | 'user';

export type MainSheetProps = {
  navigate: (menu: MenuTypes) => void;
};
export type UserSheetProps = {
  goBack: () => void;
};
