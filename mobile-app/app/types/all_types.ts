export interface ButtonProps {
  title: string;
  onPress: () => void;
  primary?: boolean;
  disabled?: boolean;
  isFullWidth?: boolean;
}

export interface HeaderProps {
  title: string;
  subtitle: string;
}
