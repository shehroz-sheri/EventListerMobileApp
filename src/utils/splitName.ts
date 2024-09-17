function getFirstAndLastName(fullName: string) {
  const nameParts = fullName.trim().split(" ");
  const firstName = nameParts[0];
  const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : "";

  return { firstName, lastName };
}

export default getFirstAndLastName;
