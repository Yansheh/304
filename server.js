var http = require('http');
var fs = require("fs");
var qs = require('querystring');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var dbUrl = "mongodb://localhost:27017/";



http.createServer(function(request, response) {

	if(request.url === "/index"){
		sendFileContent(response, "index.html", "text/html");
	}
	else if(request.url === "/indexall"){
		sendFileContent(response, "indexall.html", "text/html");
	}
	
	else if(request.url === "/loginpage"){
		sendFileContent(response, "loginpage.html", "text/html");
	}
	else if(request.url === "/api"){
		sendFileContent(response, "api.html", "text/html");
	}
	else if(request.url === "/map"){
		sendFileContent(response, "map.html", "text/html");
	}
	else if(request.url === "/member"){
		sendFileContent(response, "member.html", "text/html");
	}
	else if(request.url === "/video"){
		sendFileContent(response, "video.html", "text/html");
	}
	else if(request.url === "/"){
		console.log("Requested URL is url" +request.url);
		response.writeHead(200, {'Content-Type': 'text/html'});
		response.write('<b>Hey there!</b><br /><br />This is the default response. Requested URL is: ' + request.url);
	}
	
	//*****************************update 3/8

	    else if(request.url==="/update"){
        if (request.method === "PUT") {
            console.log("sending");
        formData = '';
        msg = '';
        return request.on('data', function (data) {
          formData += data;
          console.log(formData);
			info=formData.split("&");
			console.log("info 0 = " + info[0]); //login=yan
			console.log("info 1 = " + info[1]); //password=666

          return request.on('end', function() {
            var user;
            user = qs.parse(formData);
            user.id = "123456";
            msg = JSON.stringify(user);
				for(i=0; i<1; i++){
                var c=info[i].split("=");
				}
            
            console.log("c0 = " + c[0]);
            console.log("c1 = " + c[1]);
            
            for(i=1; i<info.length; i++){
			var d=info[i].split("=");
			}
				
			console.log("d0 = " + d[0]);
			console.log("d1 = " + d[1]);

            stringMsg = JSON.parse(msg);

					
			MongoClient.connect(dbUrl, function(err, db) {

  					if (err) throw err;
						var dbo = db.db("mydb");
						//var myobj = stringMsg;
						var query = { login: c[1] };
						var newvalues = { $set: { password: d[1] }};
					
  					dbo.collection("customers").updateOne(query, newvalues, function(err, result) {  


    				if (err) throw err;
    				console.log("1 document updated");
    				response.end("Updated"); 
					db.close();
  					});

				});
            
		  });

        });
        
      } else {
        //form = publicPath + "ajaxSignupForm.html";
        sendFileContent(response, "update.html", "text/html");
      }

}
	//******************************update

	
	//***********************************logig
	
	else if(request.url==="/login"){
              
        if (request.method === "POST") {
            console.log("sending");
        	formData = '';
        	msg = '';
      	  return request.on('data', function (data) {
         	formData += data;
         	console.log(formData);
        	info=formData.split("&");
      		console.log(info[0]); //login=yan
       		console.log(info[1]); //password=666

       		user=info[0].split["="];
       		pass=info[1].split["="];

          return request.on('end', function() {
            var user;
            user = qs.parse(formData);
            user.id = "123456";
            msg = JSON.stringify(user);
			
			info=formData.split("&");  
            
            for(i=0; i<1; i++){ 
                var c=info[i].split("=");  //login
            }
            
            console.log(c[0]);
            console.log(c[1]);
            info=formData.split("&");  
            
            for(i=1; i<info.length; i++){
                var d=info[i].split("="); //password
            }
            
            console.log(d[0]);
            console.log(d[1]);
            stringMsg = JSON.parse(msg);
	      					
					
					MongoClient.connect(dbUrl, function(err, db) {       //******19/6check login-->done
						if (err) throw err;
						var dbo = db.db("mydb");
						var myobj = stringMsg;
						var query = { login: c[1] , password: d[1] };
						var items = query;
						
						dbo.collection("customers").find(query).toArray(function(err, items) {
						
						var array=[];
							for (var i=0; i<items.length; i++){
								array.push(items[i].login);
							}
						
							if (err) throw err;
							console.log(items.length);
							
							if (items.length >=1) {
								isLoginSuccessful = true;
								console.log("Login OK");
								response.end("LoginSuccess");   /////////////////////3/7

							} else {
								isLoginSuccessful =false;
								console.log("Fail To login");
								response.end("Wrong Login & Password");
								db.close();
							}
							
						});
					});
					
				   // request.writeHead(200, {
					//  "Content-Type": "application/json",
					//  "Content-Length": msg.length
				   // });
					//return request.end("okok");
					//response.end("LoginSuccess");
				  });

				});
				
		} else {
				//form = publicPath + "ajaxSignupForm.html";
				sendFileContent(response, "index.html", "text/html");
			  }
          
}
	
	
	//*******************************************************favlist 26/6
	
	    else if(request.url==="/favlist"){
        if (request.method === "POST") {
            console.log("sending");
        formData = '';
        msg = '';
        return request.on('data', function (data) {
          formData += data;
          console.log(formData);
			info=formData.split("&");
			console.log(info[0]); //login=yan
			console.log(info[1]); //password=666

        //user=info[0].split["="];

        //pass=info[1].split["="];

          return request.on('end', function() {
            var user;
            user = qs.parse(formData);
            user.id = "123456";
            msg = JSON.stringify(user);
				for(i=0; i<1; i++){
                var c=info[i].split("=");
				}
            
            console.log(c[0]);
            console.log(c[1]);
            
            for(i=1; i<info.length; i++){
			var d=info[i].split("=");
			}
				
			console.log(d[0]);
			console.log(d[1]);
            stringMsg = JSON.parse(msg);
					var items = { logid: c[1],content: d[1]};
					var logid = c[1];
					var content = d[1];
					
			MongoClient.connect(dbUrl, function(err, db) {

  					if (err) throw err;
						var dbo = db.db("mydb");
						var myobj = stringMsg;
						var query = { logid: c[1] , content: d[1] };
						var items = query;
					
  					dbo.collection("favlist").insertOne(myobj, function(err, result) {   //*************insert register

    				if (err) throw err;
    				console.log("1 document inserted");
    				db.close();
  					});

				});
            
		  });

        });
        
      } else {
        //form = publicPath + "ajaxSignupForm.html";
        sendFileContent(response, "favlist.html", "text/html");
      }

}



/************************ 15/7 added show fav ************************/
		else if(request.url==="/myfav"){
        if (request.method === "POST") {
            console.log("Get favlist");
        formData = '';
        msg = '';
        return request.on('data', function (data) {
          formData += data;
          console.log("FormData= " + formData);
			

          return request.on('end', function() {

            var user;
            user = qs.parse(formData);

            user.id = "123456";
            msg = JSON.stringify(user);
				for(i=0; i<1; i++){
                var c=info[i].split("=");
				}
            
            console.log(c[0]); // login
            console.log(c[1]); // login id
            
					
			MongoClient.connect(dbUrl, function(err, db) {

  					if (err) throw err;
						var dbo = db.db("mydb");
						var myobj = stringMsg;
						var query = { login: c[1] };


            /* can remove if you like start */

						/*console.log("show myobj=");
						console.log(myobj);
						console.log("query=");
						console.log(query);*/

            /* can remove if you like end */
					
  					dbo.collection("favlist").find(query).toArray(function(err, items) {   //*************insert register
  					

    				if (err) throw err;

            /* can remove if you like start */

    				/*console.log("User items= ");
    				console.log(items);
    				console.log("items.length= ");
    				console.log(items.length);

    				console.log("query is");
    				console.log(query);

    				console.log("items[i].favlist= ");
    				console.log(items[i].favlist);*/

            /* can remove if you like end */

					response.end(JSON.stringify(items)); // 4/8


					console.log("show fav success!");

					db.close();
  				});

          ////// Delete items start //////////
          var delquery = { favlist: formData };
          console.log("delquery = " + delquery);

          dbo.collection("favlist").deleteOne(delquery, function(err, obj){
            if (err) throw err;
            console.log("1 document deleted");
            
            db.close();
          });
          ////// Delete items end //////////

				});
            
        //db.close();

		  });

        });
        
      } else {
        sendFileContent(response, "myfav.html", "text/html");
      }

}

/************************ 15/7 added show fav end ************************/


//***********************************register
	

	
	    else if(request.url==="/home"){
               console.log("home");
        if (request.method === "POST") {
            console.log("sending");
        formData = '';
        msg = '';
        return request.on('data', function (data) {
          formData += data;
          console.log(formData);

        info=formData.split("&");
        console.log(info[0]); //login=yan
        console.log(info[1]); //password=666

        user=info[0].split["="];

        pass=info[1].split["="];

        //user[1];
        //pass[1];

          return request.on('end', function() {
            var user;
            user = qs.parse(formData);
            user.id = "123456";
            msg = JSON.stringify(user);
			
			
            info=formData.split("&");  
            
            for(i=0; i<info.length; i++){
                
                var d=info[i].split("=");
            }
            
            console.log("d0="+d[0]);
            console.log(d[1]);
            
            stringMsg = JSON.parse(msg);
			MongoClient.connect(dbUrl, function(err, db) {

  					if (err) throw err;
  					var dbo = db.db("mydb");
  					var myobj = stringMsg;

  					dbo.collection("customers").insertOne(myobj, function(err, result) {   //*************insert register
						
  					//dbo.collection("customers").find({}).toArray(function(err, result) {  //19/6 show client favlist
					
					var array=[];
					           for (var i=0; i<result.length; i++){
								   array.push(result[i].login);
							   }

					console.log(array);
					
    				if (err) throw err;

    				console.log("1 document inserted");
					 // console.log("result.loginname");
	
    				db.close();
					response.end("okok");
					//return response.end(array.toString());  //19/6
  					});

			});

			
            response.end("okokss");
          });

        });
        
      } else {
        //form = publicPath + "ajaxSignupForm.html";
        sendFileContent(response, "index.html", "text/html");
       
      }


              
}
	else if(/^\/[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]*.js$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "text/javascript");
	}
	else if(/^\/[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]*.css$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "text/css");
	}
	else if(/^\/[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]*.jpg$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "text/jpg");
	}
	else if(/^\/[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]*.png$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "text/png");
	}
	else if(/^\/[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]*.min.js$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "text/javascript");
	}
	else if(/^\/[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]*.min.css$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "text/css");
	}
	else if(/^\/[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]*.*$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "text/css");
	}
	else{
		console.log("Requested URL is: " + request.url);
		response.end();
	}
}).listen(9999)

function sendFileContent(response, fileName, contentType){
	fs.readFile(fileName, function(err, data){
		if(err){
			response.writeHead(404);
			response.write("Not Found!");
		}
		else{
			response.writeHead(200, {'Content-Type': contentType});
			response.write(data);
		}
		response.end();
	});
}