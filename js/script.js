/*****************************MODEL****************************/ 

	var Client = Backbone.Model.extend({
	    defaults : {
	        id : null,
	        name : null,
	        firstname : null
	    },
	    initialize : function() {
	        console.log("initialize client");
	    }
	});


	var ClientsCollection = Backbone.Collection.extend({
	    model : Client,
	    localStorage : new Store("clients"),
	    initialize : function() {
	        console.log("initialize clients collection");
	    }
	});





/******************************VIEW****************************/ 

	var ClientView = Backbone.View.extend({

	    el : $(".page.home"), /* Utilisation de zepto pour lier ClientView au DOM */

	    initialize : function() {
	        var self = this;

	        //création d'une collection de clients
	        this.listClients = new ClientsCollection();

	        //récupération des données du localstorage
	        this.listClients.fetch();
	        this.listClients.each(function(c){ 
	            self.updateRenderList(c)
	        });
	        
	        //Dés qu'il y a un ajout mise à jour le render
	        this.listClients.bind("add", function(model){
	            self.updateRenderList(model);
	        });

	    },

	    events : {

	        'click .addClient' : 'addClient'
	    },

	    addClient : function(){
	        
	        var tmpClient = new Client({
	            id : $(".idClient").val(),
	            name : $(".nameClient").val(),
	            firstname : $(".firstnameClient").val()
	        });
	        
	        //ajout du client dans la collection
	        this.listClients.add(tmpClient);
	        
	        //sauvegarde dans le localstorage
	        tmpClient.save();
	        
	    },


	    updateRenderList : function(model) {

	       $('.listClient').append(
				'<tr>'+
					'<td>'+model.get('id')+'</td>'+
					'<td>'+model.get('firstname')+'</td>'+
					'<td>'+model.get('name')+'</td>'+
					'<td>'+
						'<div class="btn btn-mini" data-id="'+model.get('id')+'"><i class="icon-pencil"></i> Modifier</div> '+
	        			'<div class="btn btn-mini" data-id="'+model.get('id')+'"><i class="icon-remove"></i> Supprimer</div>'+
	        		'</td>'+
				'</tr>'
			);
	    }

	});





        
/******************************ROUTER****************************/ 



	var Workspace = Backbone.Router.extend({
	    initialize : function() {
	        /* Instancier la vue client */
	        this.clientView = new ClientView();

	    }


	});


	var myApp = new Workspace();

