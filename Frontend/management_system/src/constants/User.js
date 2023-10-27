// @ts-ignore
const { Role } = require("./Role");

export var USERS = [
  {
    id: 1,
    name: "Ruby",
    role: Role.Resident,
    username: "resident",
    password: "123",
    phone: null,
    company: null,
    image: null,
  },
  {
    id: 2,
    name: "Henry",
    role: Role.HOA,
    username: "hoa",
    password: "123",
    phone: null,
    company: null,
    image: null,
  },
  {
    id: 2,
    name: "Taylor",
    role: Role.ThirdPartyCompany,
    username: "thirdpartycompany",
    password: "123",
    phone: null,
    company: null,
    image: null,
  },
];
export function updateUserById() {
  USERS[0].phone = 123345;
  console.log("USERS", USERS[0]);
}
