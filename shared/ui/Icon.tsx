import {
    Feather,
    FontAwesome5,
    Ionicons,
    MaterialCommunityIcons,
    MaterialIcons,
} from "@expo/vector-icons";
import React from "react";

// 아이콘 타입 정의
type IconSet =
  | "ionicons"
  | "material"
  | "material-community"
  | "feather"
  | "fontawesome5";

interface IconMapping {
  set: IconSet;
  name: string;
}

// 아이콘 매핑
export const IconMap: Record<string, IconMapping> = {
  // Navigation
  home: { set: "ionicons", name: "home" },
  homeOutline: { set: "ionicons", name: "home-outline" },
  document: { set: "ionicons", name: "document-text" },
  documentOutline: { set: "ionicons", name: "document-text-outline" },
  add: { set: "ionicons", name: "add-circle" },
  addOutline: { set: "ionicons", name: "add-circle-outline" },
  user: { set: "ionicons", name: "person" },
  userOutline: { set: "ionicons", name: "person-outline" },
  settings: { set: "ionicons", name: "settings" },
  settingsOutline: { set: "ionicons", name: "settings-outline" },

  // Actions
  arrowLeft: { set: "ionicons", name: "arrow-back" },
  arrowRight: { set: "ionicons", name: "arrow-forward" },
  chevronLeft: { set: "ionicons", name: "chevron-back" },
  chevronRight: { set: "ionicons", name: "chevron-forward" },
  chevronDown: { set: "ionicons", name: "chevron-down" },
  chevronUp: { set: "ionicons", name: "chevron-up" },
  close: { set: "ionicons", name: "close-circle-outline" },
  closeBold: { set: "ionicons", name: "close-circle" },
  check: { set: "ionicons", name: "checkmark-circle" },
  checkOutline: { set: "ionicons", name: "checkmark-circle-outline" },
  search: { set: "ionicons", name: "search-outline" },
  searchBold: { set: "ionicons", name: "search" },
  logout: { set: "ionicons", name: "log-out-outline" },
  logoutBold: { set: "ionicons", name: "log-out" },

  // Content
  star: { set: "ionicons", name: "star" },
  starOutline: { set: "ionicons", name: "star-outline" },
  bulb: { set: "ionicons", name: "bulb" },
  bulbOutline: { set: "ionicons", name: "bulb-outline" },
  chart: { set: "ionicons", name: "bar-chart" },
  chartOutline: { set: "ionicons", name: "bar-chart-outline" },
  tablet: { set: "ionicons", name: "tablet-portrait" },
  tabletOutline: { set: "ionicons", name: "tablet-portrait-outline" },
  list: { set: "ionicons", name: "list" },
  listOutline: { set: "ionicons", name: "list-outline" },

  // Education
  school: { set: "ionicons", name: "school" },
  schoolOutline: { set: "ionicons", name: "school-outline" },
  book: { set: "ionicons", name: "book" },
  bookOutline: { set: "ionicons", name: "book-outline" },
  pen: { set: "ionicons", name: "pencil" },
  penOutline: { set: "feather", name: "edit-2" },
  calendar: { set: "ionicons", name: "calendar" },
  calendarOutline: { set: "ionicons", name: "calendar-outline" },

  // Status
  info: { set: "ionicons", name: "information-circle" },
  infoOutline: { set: "ionicons", name: "information-circle-outline" },
  warning: { set: "ionicons", name: "warning" },
  warningOutline: { set: "ionicons", name: "warning-outline" },
  success: { set: "ionicons", name: "checkmark-circle" },
  error: { set: "ionicons", name: "close-circle" },

  // Misc
  phone: { set: "ionicons", name: "call" },
  phoneOutline: { set: "ionicons", name: "call-outline" },
  mail: { set: "ionicons", name: "mail" },
  mailOutline: { set: "ionicons", name: "mail-outline" },
  clipboard: { set: "ionicons", name: "clipboard" },
  clipboardOutline: { set: "ionicons", name: "clipboard-outline" },
  send: { set: "ionicons", name: "send" },
  sendOutline: { set: "ionicons", name: "send-outline" },
  code: { set: "ionicons", name: "code-slash" },
  codeOutline: { set: "ionicons", name: "code-slash-outline" },
  cpu: { set: "material-community", name: "cpu-64-bit" },
  cpuOutline: { set: "material-community", name: "cpu-64-bit" },
  robot: { set: "material-community", name: "robot" },
  robotOutline: { set: "material-community", name: "robot-outline" },
  target: { set: "feather", name: "target" },
  targetOutline: { set: "feather", name: "target" },
  users: { set: "ionicons", name: "people" },
  usersOutline: { set: "ionicons", name: "people-outline" },
  time: { set: "ionicons", name: "time" },
  timeOutline: { set: "ionicons", name: "time-outline" },
  laptop: { set: "ionicons", name: "laptop" },
  laptopOutline: { set: "ionicons", name: "laptop-outline" },
  monitor: { set: "ionicons", name: "desktop" },
  monitorOutline: { set: "ionicons", name: "desktop-outline" },
  layers: { set: "ionicons", name: "layers" },
  layersOutline: { set: "ionicons", name: "layers-outline" },
  bookmark: { set: "ionicons", name: "bookmark" },
  bookmarkOutline: { set: "ionicons", name: "bookmark-outline" },
  edit: { set: "ionicons", name: "create" },
  editOutline: { set: "ionicons", name: "create-outline" },
  plus: { set: "ionicons", name: "add-circle" },
  plusOutline: { set: "ionicons", name: "add-circle-outline" },
  menu: { set: "ionicons", name: "menu-outline" },
  menuBold: { set: "ionicons", name: "menu" },
  refresh: { set: "ionicons", name: "refresh" },
  refreshOutline: { set: "ionicons", name: "refresh-outline" },
  filter: { set: "ionicons", name: "filter" },
  filterOutline: { set: "ionicons", name: "filter-outline" },
  copy: { set: "ionicons", name: "copy" },
  copyOutline: { set: "ionicons", name: "copy-outline" },
  share: { set: "ionicons", name: "share-social" },
  shareOutline: { set: "ionicons", name: "share-social-outline" },
  more: { set: "ionicons", name: "ellipsis-horizontal" },
  moreOutline: { set: "ionicons", name: "ellipsis-horizontal-outline" },
  widget: { set: "material-community", name: "widgets" },
  widgetOutline: { set: "material-community", name: "widgets-outline" },
  folder: { set: "ionicons", name: "folder" },
  folderOutline: { set: "ionicons", name: "folder-outline" },
  heart: { set: "ionicons", name: "heart" },
  heartOutline: { set: "ionicons", name: "heart-outline" },
  notification: { set: "ionicons", name: "notifications" },
  notificationOutline: { set: "ionicons", name: "notifications-outline" },
} as const;

export type IconName = keyof typeof IconMap;

interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color = "#1F2937",
}) => {
  const iconMapping = IconMap[name];

  if (!iconMapping) {
    return null;
  }

  switch (iconMapping.set) {
    case "ionicons":
      return (
        <Ionicons name={iconMapping.name as any} size={size} color={color} />
      );
    case "material":
      return (
        <MaterialIcons
          name={iconMapping.name as any}
          size={size}
          color={color}
        />
      );
    case "material-community":
      return (
        <MaterialCommunityIcons
          name={iconMapping.name as any}
          size={size}
          color={color}
        />
      );
    case "feather":
      return (
        <Feather name={iconMapping.name as any} size={size} color={color} />
      );
    case "fontawesome5":
      return (
        <FontAwesome5
          name={iconMapping.name as any}
          size={size}
          color={color}
        />
      );
    default:
      return null;
  }
};

// 하위 호환성을 위한 별칭
export const SolarIcons = IconMap;
export type SolarIconName = IconName;

export default Icon;
