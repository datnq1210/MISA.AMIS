import axios from 'axios'

var approver = [];
axios.get("http://localhost:52698/api/v1/Approvers").then((response)=>{
    response.data.forEach(element => {
        approver.push(element);
    });
})

export default {
    getApprover(){
        return approver;
    }
}