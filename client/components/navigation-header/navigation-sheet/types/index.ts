export type MenuTypes = 'main' | 'user' | 'bikes';

export type MainSheetProps = {
  navigate: (menu: MenuTypes) => void;
};
export type NestedSheetProps = {
  goBack: () => void;
};
