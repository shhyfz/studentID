define(["jquery","underscore","backbone","scripts/model/model","text!scripts/template/watCard.tpl.html","text!scripts/template/watCardOld.tpl.html"],
	function ($,_,Backbone,student,watCardTemplate,watCardOldTemplate) {

		return Backbone.View.extend({
			el:"#content",

			model: null,

			isOld: null,

			initialize: function(options){
				this.model = options.model;
				this.isOld = options.isOld;
				this.render();
				$("body").on("click","#back", this.back);
			},

			render: function(){
				var currentMonth = 8;
				var expirationYear = 2013;
				if(this.model.get("admittedYear")<2013 && this.model.get("status")==="FULL TIME UNDERGRAD"){
					expirationYear = parseInt(this.model.get("admittedYear")) + 6;
				}else if(this.model.get("admittedYear")>=2013 && this.model.get("status")==="FULL TIME UNDERGRAD"){
					expirationYear = parseInt(this.model.get("admittedYear")) + 5;
				}
				if(expirationYear<2013 && currentMonth>6){
					expirationYear++;
				}

				var lastName = this.model.get("lastName").toUpperCase();
				var givenName = this.model.get("givenName").toUpperCase();
				var middleName = this.model.get("middleName");
				if(middleName){
					middleName = middleName.charAt(0).toUpperCase() + ". ";
				}else{
					middleName = "";
				}
				if(this.isOld){
					this.template = _.template(watCardOldTemplate);
				}else{
					this.template = _.template(watCardTemplate);
				}

				this.$el.append(this.template({
					lastName: lastName,
					givenName: givenName,
					middleName: middleName,
					studentID: this.model.get("studentID"),
					program: this.model.get("program"),
					status: this.model.get("status"),
					expirationYear: expirationYear,
				}));
				if(this.model.get("photo")){
					$("#watCard-photo").css("background-image","url("+this.model.get("photo")+")");
					$("#watCard-old-photo").css("background-image","url("+this.model.get("photo")+")");
				}
				return this;
			},

			back: function(){
				$("body").off("click","#back", this.back);
				$("#watCard").remove();
				$("#generator").removeClass("hidden");
				$("body").on("click","#back", function(){location.reload();});
			}

		});

	});