// @ts-ignore
const { Role } = require("./Role");

export var USERS = [
  {
    id: 1,
    name: "Ruby",
    role: Role.resident,
    username: "resident",
    password: "123",
    phone: '',
    company: '',
  },
  {
    id: 2,
    name: "Henry",
    role: Role.HOA,
    username: "hoa",
    password: "123",
    phone: '',
    company: '',
  },
  {
    id: 3,
    name: "Taylor",
    role: Role.ThirdPartyCompany,
    username: "thirdpartycompany",
    password: "123",
    phone: '',
    company: '',
  },
];
