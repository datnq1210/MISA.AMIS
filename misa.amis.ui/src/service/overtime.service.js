import axios from "axios";

export default {
  removeRegisterOvertime(id, callback = null) {
    axios
      .delete("http://localhost:52698/api/v1/OvertimeForms/" + id)
      .then(() => {
        callback && callback();
      });
  },
  addRegisterOvertime(obj, callback = null) {
    console.log("Them du lieu:");
    console.log(obj);
    axios
      .post("http://localhost:52698/api/v1/OvertimeForms", obj)
      .then((res) => {
        console.log("post:", res.data);
        callback && callback();
      })
      .catch(function(error) {
        console.log("error:", error.response.data);
      });
  },
  updateRegisterOvertime(newObj, callback = null) {
    axios
      .put(
        "http://localhost:52698/api/v1/OvertimeForms/" + newObj.overtimeId,
        newObj
      )
      .then(() => {
        callback && callback();
      });
  },
};
