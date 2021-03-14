import axios from "axios";

var applicants = [];

axios.get("http://localhost:52698/api/v1/Applicants").then(function(response) {
  response.data.forEach((element) => {
    applicants.push(element);
  });
});

export default {
  getApplicant() {
    return applicants;
  },
};
