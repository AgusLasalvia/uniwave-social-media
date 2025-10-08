export interface Settings {
  Language: string;
  Background: string;
  PrimaryColor: string;
  SecondaryColor: string;
  NotificationsEnabled: boolean;
}

export interface UpdateSetting {
  userID: string;
  Language: string;
  Background: string;
  PrimaryColor: string;
  SecondaryColor: string;
  NotificationsEnabled: boolean;
}
