function sendVerificationVM(){
	var self = this;
	self.send = function(){
		if(self.canChange()){
			$.ajax({
				url: BASE_URL+"candidate/sendVerification",
				type: "post",
				data: JSON.stringify("email address or user id here"),
				contentType: "application/json",
				success: function () {
					window.location.href = "../candidateSendVerification/sendVerification.html";
				}
			});
		}
		
	};
	
}
ko.applyBindings(new sendVerificationVM());