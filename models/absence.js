class Absence {
  constructor(
    id,
    ownerId,
    firstName,
    lastName,
    status,
    startDate,
    endDate,
    type,
    description,
  ) {
    this.id = id;
    this.ownerId = ownerId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.status = status;
    this.startDate = startDate;
    this.endDate = endDate;
    this.type = type;
    this.description = description;
  }
}

export default Absence;
