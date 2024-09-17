import { Passwords } from "../types/types";

export const dummyDescription =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum accusamus iusto aut temporibus iure voluptas natus, exercitationem nihil. Possimus corrupti id modi ut illum doloremque, vero pariatur unde soluta voluptatem nulla quia dolorum beatae eligendi facilis. Voluptates, doloribus. Architecto porro ad, quas exercitationem qui animi. Temporibus qui dolores tenetur nulla?";

export const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const eventCategories = [
  "Concert",
  "Webinar",
  "Workshop",
  "Art Exhibition",
];

export const eventTypeOptions = [
  "Workshop",
  "Art Exhibition",
  "Concert",
  "Webinar",
];

export const ERROR_MESSAGES = {
  EMPTY_FIELDS: "Please fill all fields",
  PASSWORD_MISMATCH: "New passwords do not match",
  SAME_PASSWORD: "New password cannot be the same as the old password",
};

export const defaultMapImageUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6vWjhnlplH3Wp3ffDubdw2Km1ixBt0N5Xbg&s";

export const uniqueFileName = `event_${Date.now()}_${Math.random()
  .toString(36)
  .substr(2, 9)}.jpg`;

export const resetPasswordFields: Array<{
  key: keyof Passwords;
  label: string;
  secureTextEntry: boolean;
}> = [
  { key: "oldPassword", label: "Old Password", secureTextEntry: true },
  { key: "newPassword", label: "New Password", secureTextEntry: true },
  {
    key: "confirmNewPassword",
    label: "Confirm New Password",
    secureTextEntry: true,
  },
];
