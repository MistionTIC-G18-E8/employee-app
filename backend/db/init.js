var faker = require("faker");
const db = require("../models");
const NumberRecords = 100;

const User = db.user;
const Employee = db.employee;
const Contract = db.contract;
const Payslip = db.payslip;
const EmployeeRequest = db.employee_request;
const ObjectId = db.mongoose.Types.ObjectId;

const preuser = [
  {
    first_name: "Camilo",
    last_name: "Chavez",
    email: "camilo@email.com",
    permission: 1,
  },
  {
    first_name: "Erik",
    last_name: "Torres",
    email: "erik@email.com",
    permission: 1,
  },
  {
    first_name: "Raul",
    last_name: "López",
    email: "raul@email.com",
    permission: 1,
  },
  {
    first_name: "Javier",
    last_name: "López",
    email: "javier@email.com",
    permission: 1,
  },
]
const genders = ['male', 'female'];
const requests_type = ['leave', 'vacation', 'timeoff', 'sick', 'other'];
const requests_state = ['approved', 'denied', 'pending']
const emails = {}

module.exports = async () => {
  // Drop all data first
  console.log("Dropping all database data");
  await db.mongoose.connection.db.dropDatabase();
  console.log("Database dropped");
  console.log("Creating new database data");
  const tosave = {
    user: [],
    employee: [],
    contract: [],
    payslip: [],
    employee_request: [],
  }
  // TODO: Api docs https://fakerjsdocs.netlify.app/api/date.html#recent-days-refdate
  const permission = 5;
  for (let i = 0; i < NumberRecords; i++) {
    faker.locale = "es";

    let contract = {
      _id: ObjectId(),
      daily_rate: faker.finance.amount(50000, 500000),
      employee: db.mongoose.Types.ObjectId(),
      start_date: faker.date.past(2),
      end_date: faker.date.future(2),
    }
    contract.monthly_rate = Math.round(contract.daily_rate * 30)

    const genIdx = Math.round(Math.random());
    const gender = genders[genIdx];
    let employee = {
      _id: ObjectId(),
      first_name: faker.name.firstName(genIdx),
      last_name: faker.name.lastName(genIdx),
      gender: gender,
      phone: faker.phone.phoneNumber(),
      address: faker.address.streetAddress(),
      joined_at: faker.date.past(2),
      contract: contract._id,
      jobtitle: faker.name.jobTitle(),
      department: faker.commerce.department(),
    };
    // Make sure the email is unique
    let email = faker.internet.email(employee.first_name, employee.last_name);
    while (emails[email]) {
      email = faker.internet.email(employee.first_name, employee.last_name);
    }
    employee.email = email;
    emails[email] = true;

    // Merge predefined users when there's still some
    let override_user = preuser.pop() || {};
    employee = Object.assign(employee, override_user);

    let user = {
      _id: ObjectId(),
      email: employee.email,
      employee: employee._id,
      password: "password",
      permission: permission,
    }

    // TODO: Create multplie, one every 15 days perhaps?
    let payslip = {
      _id: ObjectId(),
      contract: contract._id,
      employee: employee._id,
      start: faker.date.past(2),
      days: faker.datatype.number({ min: 20, max: 31 }),
    }
    payslip.end = faker.date.future(2);
    payslip.amount = Math.round(payslip.days * contract.daily_rate);

    let request = {
      _id: ObjectId(),
      type: faker.random.arrayElement(requests_type),
      state: faker.random.arrayElement(requests_state),
      paid: faker.datatype.boolean(),
      start: faker.date.past(20),
      end: faker.date.future(25),
      employee: employee._id,
      approved_by: employee._id,
      contract: contract._id,
    }
    request.days = (request.end.getDay() - request.start.getDay()) + 1;

    //Create the objects
    user = new User(user)
    employee = new Employee(employee)
    contract = new Contract(contract);
    payslip = new Payslip(payslip);
    request = new EmployeeRequest(request);

    // Push to save later
    tosave.user.push(user);
    tosave.employee.push(employee);
    tosave.contract.push(contract);
    tosave.payslip.push(payslip);
    tosave.employee_request.push(request);
  };
  // Save all the objects
  for (let key in tosave) {
    // User documents need saving to get the hashed password
    if (key == "user") {
      for (let i = 0; i < tosave[key].length; i++) {
        tosave[key][i].save();
      }
    } else {
      db[key].insertMany(tosave[key]);
    }
  }
  console.log("Database initialzed");
}
