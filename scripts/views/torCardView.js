define(["jquery","underscore","backbone","scripts/model/model","text!scripts/template/torCard.tpl.html"],
	function ($,_,Backbone,student,watCardTemplate) {

		return Backbone.View.extend({
			el:"#content",

			model: null,

			template:_.template(watCardTemplate),

			initialize: function(options){
				this.model = options.model;
				this.render();
				$("body").on("click","#back", this.back);
			},

			render: function(){
				var lastName = this.model.get("lastName").toUpperCase();
				var givenName = this.model.get("givenName").toUpperCase();
				var UTORid = this.model.get("UTORid").toLowerCase();
				
				this.$el.append(this.template({
					lastName: lastName,
					givenName: givenName,
					studentNo: this.model.get("studentNo"),
					UTORid: UTORid,
					libraryId: this.model.get("libraryId"),
					issueDate: this.getDate()
				}));
				if(this.model.get("photo")){
					$("#torCard-photo").css("background-image","url("+this.model.get("photo")+")");
				}
				return this;
			},

			back: function(){
				$("body").off("click","#back", this.back);
				$("#torCard").remove();
				$("#generator").removeClass("hidden");
				$("body").on("click","#back", function(){location.reload();});
			},

			getDate: function(){
				var currentDate = new Date();
				var day = currentDate.getDate();
				if(day<10){
					day = "0"+day;
				}
				var month = currentDate.getMonth()+1;
				if(month<10){
					month = "0"+month;
				}
				var year = currentDate.getFullYear()+"";
				year = year.slice(-2);
				return day+"-"+month+"-"+year;        
			}

		});

	});