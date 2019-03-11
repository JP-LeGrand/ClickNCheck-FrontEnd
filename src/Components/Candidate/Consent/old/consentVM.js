const baseUri = 'https://localhost:44347/api/';
let checks=[];
$(function(){
    let searchParams = new URLSearchParams(window.location.search);

    if (searchParams.has('id') && searchParams.has('vc')){
        let id = searchParams.get('id');
        localStorage.setItem('canID', id);
        console.log(id);
        let vc = searchParams.get('vc');
        console.log(vc);
        $.ajax({
            url: BASE_URL+'Candidates/GetCandidate/'+id,
            type: 'get',
            contentType: 'application/json',
            success: function (candidate) {
                let arr = candidate;
                sessionStorage.setItem('name', arr.name);
                sessionStorage.setItem('surname',arr.surname);
                $.ajax({
                    url: BASE_URL+'VerificationChecks/services/'+vc,
                    type: 'get',
                    contentType: 'application/json',
                    success: function (jopProfile) {
                        console.log(jopProfile);
                        let arr = [];
                        for (let i =0;i < jopProfile.length; i ++){
                            arr.push(jopProfile[i]);	
                        }
                        console.log('arr');
                        console.log(arr);
                        sessionStorage.setItem('checks', arr);
                        function loginCandidateVM(){
	
                            let self = this;
                            self.name = ko.observable(sessionStorage.getItem('name')+' '+sessionStorage.getItem('surname'));
                            self.companyName = ko.observable('Retro Rabbit');
                            self.consented = ko.observable(false); 
                            self.verificationChecks = ko.observableArray(sessionStorage.getItem('checks').split(','));
						
                            self.fileData = ko.observable({
                                dataURL: ko.observable(),
                                // base64String: ko.observable(),
                            });
                            self.multiFileData = ko.observable({
                                dataURLArray: ko.observableArray(),
                            });
                            self.onClear = function(fileData){
                                if (confirm('Are you sure?')){
                                    fileData.clear && fileData.clear();
                                }
                            };
                            self.debug = function(){
                                window.self = self;
                            };
						
                            self.consent = function(){
                                if (self.consented() == true){
                                    let id = localStorage.getItem('canID');
                                    $.ajax({
                                        url: BASE_URL+'Candidates/PutConsent/'+id,
                                        type: 'put',
                                        contentType: 'application/json',
                                        success: function (candidate) {
                                            console.log(candidate);
                                            alert('You have successfully given consent');
                                            window.location.href = '../candidateConsentConfirmed/consentConfirmed.html';
                                        }
                                    });
                                } else {
                                    alert('You must select tick the checkbox in order to give concent');
                                }
                            };
                        }
                        ko.applyBindings(new loginCandidateVM());
                    }
                });
            }
        });
		
    }
});