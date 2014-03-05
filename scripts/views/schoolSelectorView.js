define(["jquery","jqueryColor","underscore","backbone","scripts/views/generatorView","text!scripts/template/schoolSelector.tpl.html","text!scripts/template/schoolCell.tpl.html","text!data/data.json"],
	function ($,jqueryColor,_,Backbone,generatorView,schoolSelectorTemplate,schoolCellTemplate,data) {

		return Backbone.View.extend({
			el:"#content",

			template:_.template(schoolSelectorTemplate),

			cellTemplate:_.template(schoolCellTemplate),

			events:{
				"click .school-cell":"schoolClicked"
			},

			initialize: function(){
				data = JSON.parse(data);
				this.render();
			},

			render: function(){
				this.$el.append(this.template());
				var schools = data.schoolList;
				for(var i=0;i<schools.length;i++){
					$("#school-selector").prepend(this.cellTemplate({
						id: schools[i]["id"],
						schoolId: schools[i]["schoolId"],
						schoolName: schools[i]["schoolName"],
						schoolYear: schools[i]["schoolYear"],
						image: schools[i]["image"]
					}));
				}
				return this;
			},

			schoolClicked: function(event){
				var school = $(event.currentTarget).attr("school");
				this.destroy();
				new generatorView({school:school});
			},

			destroy:function(){
				this.undelegateEvents();
    			this.$el.removeData().unbind(); 
			    this.remove();  
    			Backbone.View.prototype.remove.call(this);
    			$("body").append("<div id='content'></div>");
			}

		});

	});
