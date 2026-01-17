export interface SchoolSearchModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSelect: (school: {
    name: string;
    area: string;
    type: "초등학교" | "중학교" | "고등학교";
  }) => void;
}
