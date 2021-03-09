var registerOvertimes = [
	// {
	// 	"Id": 0,
	// 	"applicant": "Nguyễn Thanh Tùng",
	// 	"approvedBy": "Đặng Ngọc Sơn",
	// 	"dateCreate": "01/03/2021",
	// 	"dateWorkEnd": "27/03/2021",
	// 	"status": "Đã duyệt",
	// 	"reasonOvertime": "Chưa hoàn thành công việc",
	// 	"note": "Hoàn thành vào chủ nhật",
	// },
]


export default {
	getRegisterOvertime() {
		return registerOvertimes;
	},
	removeRegisterOvertime(id) {
		console.log('Truoc khi xoa')
		console.log(registerOvertimes)
		registerOvertimes = registerOvertimes.filter(item => item.Id != id);
		console.log('Sau khi xoa')
		console.log(registerOvertimes)
	},
	addRegisterOvertime(obj) {
		console.log('Them du lieu:')
		console.log(obj)
        obj.Id = Math.floor(Math.random() * 100) + 1;
		registerOvertimes.push(obj);
	},
	updateRegisterOvertime(newObj) {
		var objIndex = registerOvertimes.findIndex((obj => obj.Id == newObj.Id));

		//Log object to Console.
		console.log("Before update: ", registerOvertimes[objIndex])

		//Update object's name property.
		registerOvertimes[objIndex].applicant = newObj.applicant;
		registerOvertimes[objIndex].approvedBy = newObj.approvedBy;
		registerOvertimes[objIndex].dateCreate = newObj.dateCreate;
		registerOvertimes[objIndex].dateWorkEnd = newObj.dateWorkEnd;
		registerOvertimes[objIndex].status = newObj.status;

		//Log object to console again.
		console.log("After update: ", registerOvertimes[objIndex])
	}
}  