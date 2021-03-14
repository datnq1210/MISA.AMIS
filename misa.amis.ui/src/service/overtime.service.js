import axios from "axios";
// var data = axios
//   .get("http://localhost:52698/api/v1/OvertimeForms")
//   .then(function(response) {
//     return response.data;
//   });

var data = [];

export default {
  getRegisterOvertime() {
    data = [];
    axios
      .get("http://localhost:52698/api/v1/OvertimeForms")
      .then(function(response) {
        response.data.forEach((element) => {
          data.push(element);
        });
      });
    return data;
  },
  removeRegisterOvertime(id) {
    axios
      .delete("http://localhost:52698/api/v1/OvertimeForms/" + id)
      .then((res) => {
        console.log("delete", res);
      });
  },
  addRegisterOvertime(obj) {
    console.log("Them du lieu:");
    console.log(obj);
    axios
      .post("http://localhost:52698/api/v1/OvertimeForms", obj)
      .then((res) => {
        console.log("post:", res.data);
      })
      .catch(function(error) {
        console.log("error:", error.response.data);
      });
  },
  updateRegisterOvertime(newObj) {
    axios.put(
      "http://localhost:52698/api/v1/OvertimeForms/" + newObj.overtimeId,
      newObj
    );
  },
};
