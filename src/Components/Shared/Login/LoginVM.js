function loginVM(){
	var self = this;
	self.email = ko.observable();
	self.password = ko.observable();
	self.emailEntered = ko.observable();
	self.passwordEntered = ko.observable();

	self.canLogin = function(){
		if(self.email()){
			self.emailEntered(true);
		}else{
			self.emailEntered(false);
		}

		if(self.password()){
			self.passwordEntered(true);
		}else{
			self.passwordEntered(false);
		}

		if(self.passwordEntered() && self.emailEntered()){
			return true;
		}else{
			return false;
		}
	};

	

	self.login = function(){
		var credentials = [self.email(), self.password()];
		
		console.log(ko.toJSON(credentials));
		if(self.canLogin()){
			$.ajax({
				url: BASE_URL+"authentication/login",
				type: "post",
				data: JSON.stringify(credentials),
				contentType: "application/json",
				success: function (user_id) {
					localStorage.setItem("user_id", user_id);
					$.ajax({
						url: BASE_URL+"authentication/otp",
						type: "post",
						data: JSON.stringify(user_id),
						contentType: "application/json",
						success: function (result) {
							window.location.href = "../OTP/otp.html";
						}
					});
				}
			});
		}
		
	};
	
}
ko.applyBindings(new loginVM());