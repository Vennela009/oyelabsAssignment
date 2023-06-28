var mysql = require('mysql');

var con = mysql.createConnection({
  host:"localhost",
  user:"venn",
  password:"vgghjkiil",
  database:"mydb"
});

con.connect(function(err){
  if(err) throw err;
  con.query(
    "SELECT
      customers.customerId,
      customers.name,
      GROUP_CONCAT(
        DISTINCT lower(student_subject.subjectName)
      ) AS subject
    FROM
    (
      subject_student_mapping
      INNER JOIN subjects ON subject_student_mapping.subjectId = subjects.subjectId
    ) AS student_subject
    INNER JOIN customers ON student_subject.customerId = customers.customerId
  GROUP BY
    customers.customerId",function(err,result,fields){
      if(err) throw err;
      console.log(result);
    })
})
