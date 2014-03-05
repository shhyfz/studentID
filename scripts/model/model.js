define(["jquery","underscore","backbone"],
	function ($,_,Backbone) {
		return Backbone.Model.extend({
			defaults: function(){
				return{
					//UW
					lastName: "JOBS",
					givenName: "STEVE",
					middleName: null,
					studentID: "12345678",
					program: "ENGINEERING",
					status: "FULL TIME UNDERGRADUATE",
					admittedYear: "2000",
					photo: null,
					//UT
					studentNo: "123456789",
					UTORid: "jobsstev",
					libraryId: "00000000"
				};
			}
		});

	});