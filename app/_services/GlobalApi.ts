const { default: axios } = require("axios");

const GetAllGrades=()=>axios.get('/api/grade');
const CreateNewStudent=(data:any)=>axios.post('/api/student',data)

const GetAllStudents=()=>axios.get('/api/student');

const DeleteStudentRecord=(id:any)=>axios.delete('/api/student?id='+id)

const GetAttendanceList=(grade:any,month:any)=>axios.get('/api/attendance?grade='+grade+"&month="+month)

const MarkAttendance=(data:any)=>axios.post('/api/attendance',data);


const TotalPresentCountByDay=(date:any,grade:any)=>axios.get('/api/dashboard?date='+date+"&grade="+grade);
export default{
    GetAllGrades,
    CreateNewStudent,
    GetAllStudents,
    DeleteStudentRecord,
    GetAttendanceList,
    MarkAttendance,
    TotalPresentCountByDay
}