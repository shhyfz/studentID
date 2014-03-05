requirejs.config({
    baseUrl: "",
    paths: {
    	jquery: "lib/jquery-2.0.2.min",
    	underscore: "lib/underscore-min",
        backbone: "lib/backbone-min",
        text: "lib/text",
        jqueryColor: "lib/jquery.color-2.1.2.min"
    },
    shim: {
    	"jquery":{
    		exports: "jQuery"
    	},
    	"underscore":{
    		exports:"_",
    		init:function(){
    			return this._.noConflict();
    		}
    	},
    	"backbone": {
        	deps: ["underscore","jquery"],
    	    exports: "Backbone",
    	    init:function(){
    	    	return this.Backbone.noConflict();
    	    }
    	},
        "jqueryColor":{
            deps: ["jquery"],
            exports: "jqueryColor"
        }
	}
});

// Start the main app logic.
requirejs(["jquery","underscore","backbone","scripts/views/schoolSelectorView"],function ($,_,Backbone,schoolSelectorView) {
    var router = Backbone.Router.extend({
    	routes:{
    		"":"start"
    	},
    	start:function(){
            new schoolSelectorView();
    	}
    });
    var app = new router();
    Backbone.history.start();
});