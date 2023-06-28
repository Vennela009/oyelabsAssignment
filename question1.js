const dbConn = require('mysql');
//Making connection with database
const pool = new Pool({
    user: 'mvenn',
    host: 'localhost',
    database: 'node_sql',
    password: 'dcm123',
    port: 5000,
});
//Function to add customer to the database
function addCustomer(phoneNumber, password) {
    return new Promise((resolve, reject) => {
        validator(password) // First validate that password has special character or not
            .then(() => { return isPhoneNumberExist(phoneNumber); }) 
            .catch((e) => { console.log(e) });
        pool.query("INSERT INTO Account(phone_number,password) values($1,$2)", [phone_number, password], (err, res) => {
            if (err) {
                reject(err);
            } else resolve("Your have successfully added!");
        });

    });

}

function isPhoneNumberExist(phoneNumber) {
    return new Promise((resolve, reject) => {
        pool.query("SELECT phone_number FROM Account where phone_number =$1 ", [phone_number], (err, res) => {
            if (err) {
                reject(err);
            } else {
                if (res.rowCount) {
                    reject("Phone Number Already exist!");
                } else resolve();
            }
        });
    });
}

function validator(passowrd) {
    return new Promise((resolve, reject) => {
        const format = "/^[!@#$%^&*()_+\-=\[\]{};':|,.<>\/?]*$/";
        if (passowrd.length >= 8) {
            for (let i = 0; i < passowrd.length; i++) {
                for (let j = 0; j < format.length; j++) {
                    if (passowrd[i] === format[j]) {
                        resolve();
                    }
                }
            }
            reject("Password should have atleast one special character!");

        } else {
            reject("Password should have atleast one special character!");
        }
    });
}
addCustomer("1234567890", "123dd@")
    .then((data) => console.log(data))
    .catch((e) => console.log(e));
