export enum SeverityType {
  ERROR = "error",
  SUCCESS = "success",
  INFO = "info",
}

export interface ShowNotificationProps {
  message: string;
  duration?: number;
}
