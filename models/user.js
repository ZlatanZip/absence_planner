class User {
  constructor(
    id,
    firstName,
    lastName,
    email,
    role,
    remainingDaysAvaliable,
    remainingDays,
    transferFromPreviousYear,
    userDaysPerYear,
    reviewersList,
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.role = role;
    this.remainingDaysAvaliable = remainingDaysAvaliable;
    this.remainingDays = remainingDays;
    this.transferFromPreviousYear = transferFromPreviousYear;
    this.userDaysPerYear = userDaysPerYear;
    this.reviewersList = reviewersList;
  }
}

export default User;
