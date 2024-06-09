export type FormResponse = {
  success?: string;
  error?: string;
};

export type PrepareNotificationResponse = {
  title: string;
  text: string;
};

export type Language = "cs-CZ" | "en";

export type MinMaxDate = { minDate: Date; maxDate: Date };
