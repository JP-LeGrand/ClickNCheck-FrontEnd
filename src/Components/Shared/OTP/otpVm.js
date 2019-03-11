const URL = "https://localhost:44347/api/";

function OtpVM(){
	var self = this;
	self.digit1 = ko.observable();
	self.digit2 = ko.observable();
	self.digit3 = ko.observable();
	self.digit4 = ko.observable();
	self.digit5 = ko.observable();
    self.OTP = ko.observable();
	self.ifFilledIn = ko.observable();


	self.isFilledIn = function(){
		var canRegister = true;
		if(!self.digit1() || !self.digit2() || !self.digit3() || !self.digit4() ||  !self.digit5()){
			canRegister = false;
		}
		return canRegister;
	};

	self.submit = function(){
		if(self.isFilledIn()){
			var body = {
				OTP: self.digit1() + "" + self.digit2() + "" + self.digit3() + "" + self.digit4() + "" + self.digit5()
			};
			console.log(ko.toJSON(body));
			var user_otp = [localStorage.getItem("user_id"),body.OTP];
			$.ajax({
				type: "post",
				url: BASE_URL+"authentication/checkOtp",
				data: ko.toJSON(user_otp),
				dataType: "json",
				contentType: "application/json",
				success: function (token) {
					console.log("token0: "+token[0]);
					console.log("token1: "+token[1]);
					sessionStorage.setItem("token", token[0]);
					sessionStorage.setItem("user_name", token[2])
					sessionStorage.setItem("user_img", token[3])
					var id_pass_manager = localStorage.getItem("id_pass_manager");
					if(id_pass_manager== null){
						if(token[1] == "recruiter")
						{
							window.location.href = "../../recruiter/recruiterDashboard/recruiter_dashboard.html";
						}
						else if(token[1] == "admin")
						{
							window.location.href = "../../admin/adminAddUsers/admin_addUsers.html";
						}
					}else{
						$.ajax({
							url: BASE_URL+"users/register",
							type: "post",
							headers: {
								Authorization: "Bearer "+ token[0],
							},
							data: ko.toJSON(id_pass_manager.split(",")),
							contentType: "application/json",
							success: function (result) {
								localStorage.clear();
								if(result == "recruiter")
								{
									window.location.href = "../../recruiter/recruiterDashboard/recruiter_dashboard.html";
								}
								else if(result.indexOf("admin") >= 0)
								{
									window.location.href = "../../admin/adminAddUsers/admin_addUsers.html";
								}
							}
						});
					}
				}
			});
		}
	};
}
ko.applyBindings(new OtpVM());