define(["jquery","jqueryColor","underscore","backbone","scripts/model/model","scripts/views/watCardView","scripts/views/torCardView","text!scripts/template/generator.tpl.html","text!scripts/template/inputCell.tpl.html","text!data/data.json"],
	function ($,jqueryColor,_,Backbone,student,watCardView,torCardView,generatorTemplate,inputCellTemplate,data) {

		return Backbone.View.extend({
			el:"#content",

			model: new student(),

			school: null,

			template:_.template(generatorTemplate),

			cellTemplate:_.template(inputCellTemplate),

			events:{
				"click .input-cell":"showInputField",
				"blur .input-cell-input":"userDoneInput",
				"click .input-cell-option":"selectOption",
				"change #photo-input":"uploadPhoto",
				"click #generate":"generate",
				"click #feedback_close":"closeFeedBack",
				"keyup .input-cell-input":"keyEnteredInInput"
			},

			initialize: function(options){
				data = JSON.parse(data);
				this.school = options.school;
				$("#back").css("display","inline");
				this.render();
				$("body").on("click","#back", this.back);
			},

			render: function(){
				this.$el.append(this.template());
				var inputs = data[this.school];
				if(inputs===undefined){
					$("#content").empty();
					$("#content").append("<div id='under_construction'>Oops! We are still engineering this card generator. Please come back and check again in one second! If you have any other question or suggestion, please do let us know at <a href=\"mailto:hello@studentid.info?Subject=StudentID.info Feedback\" target=\"_top\">hello@studentid.info</a></div>");
					$("#content").append("<div id='under_construction_image'></div>");
					return;
				}
				for(var i=inputs.length-1;i>=0;i--){
					$("#generator").prepend(this.cellTemplate({
						description: inputs[i]["description"],
						inputId: inputs[i]["inputId"],
						inputType: inputs[i]["inputType"],
						dataName: inputs[i]["dataName"],
						isSelect: inputs[i]["isSelect"]
					}));
					if(inputs[i]["isSelect"]){
						var options = inputs[i]["option"];
						for(var j=0;j<options.length;j++){
							$("#"+inputs[i]["inputId"]).append("<div class='input-cell-option' value='"+options[j]["optionValue"]+"'>"+options[j]["optionText"]+"</div>");
						}
					}
				}
				return this;
			},

			showInputField: function(event){
				var input = $(event.currentTarget).find(".input-cell-input");
				if(input.length===0){
					$("#photo-input").click();
				}
				if(input.css("display")==="none"){
					this.edit($(event.currentTarget));
					this.show(input);
					input.focus();	
				}
			},

			keyEnteredInInput: function(event){
				if(event.keyCode===13){
					$(event.currentTarget).blur();
				}
			},

			userDoneInput: function(event){
				var input = $(event.currentTarget);
				if(this.inputValid(input)){
					input.parent().find(".input-cell-value").text(input.val());
					this.model.set(input.attr("data"),input.val());
					this.pass(input.parent());
				}else{
					input.val("");
					this.fail(input.parent());
				}
				var self = this;
				_.delay(function(){
					self.hide(input);
				},100);
			},

			selectOption: function(event){
				var option = $(event.currentTarget);
				if(option.attr("value")===""){
					this.toggleFeedback();
					this.hide(option.parent());
					return false;
				}
				option.parent().children().removeClass("option-selected");
				this.select(option);
				option.parent().parent().find(".input-cell-value").text(option.attr("value"));
				this.model.set(option.parent().attr("data"),option.attr("value"));
				this.pass(option.parent().parent());
				this.hide(option.parent());
				return false;
			},

			uploadPhoto: function(ev){
				var input  = ev.currentTarget;
				var self = this;
				if(input.files && input.files[0]){
					var reader = new FileReader();
					reader.onload = function(e){
						self.model.set("photo",e.target.result);
					};
					reader.readAsDataURL(input.files[0]);
					self.hide($(ev.currentTarget));
					$($("div:contains('Photo')")[2]).find(".input-cell-value").text(input.files[0].name);
					this.pass($($("div:contains('Photo')")[2]));
				}
			},

			generate: function(){
				this.hide($("#generator"));
				$("body").off("click","#back");
				if(this.school==="waterlooNew"){
					new watCardView({model:this.model,isOld:false});
				}else if(this.school=="toronto"){
					new torCardView({model:this.model});
				}
			},

			inputValid: function(input){
				if(input.attr("id")==="student-id-input"){
					var id = parseInt(input.val());
					return id > 0;
				}else if(input.attr("id")==="admitted-year-input"){
					var id = parseInt(input.val());
					return id > 1900 && id <= 2013;
				}else if(input.attr("id")==="photo-input"){
					return true;
				}else if(input.attr("id")==="student-no-input"){
					var id = parseInt(input.val());
					return id > 99999999 && id < 1000000000;
				}
				else if(input.attr("id")==="library-id-input"){
					var id = parseInt(input.val());
					return id > 9999999 && id < 100000000;
				}else{
					return input.val();
				}
			},

			toggleFeedback: function(){
				this.show($("#feedback_background"));
			},

			closeFeedBack: function(){
				this.hide($("#feedback_background"));
			},

			back: function(){
				location.reload();
			},

			show: function(el){
				el.removeClass("hidden");
			},

			hide: function(el){
				el.addClass("hidden");
			},

			select: function(el){
				el.addClass("option-selected");
			},

			edit: function(el){
				el.css("background-color","#ecf6ff");
				el.css("-webkit-transition","ease 0.5s");
			},

			pass: function(el){
				el.css("background-color","white");
				el.css("-webkit-transition","ease 0.2s");
			},

			fail: function(el){
				el.css("background-color","#ffcccc");
				el.css("-webkit-transition","ease 0.2s");
			}


		});

	});
