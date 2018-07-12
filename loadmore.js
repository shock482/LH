jQuery(function($){
	$('.btn-load').click(function() {
			if (($(this).attr('data-role') == 'incr') && (current_page != (max_pages))){
			 current_page++;
		  }	else if (($(this).attr('data-role') == 'decr') && (current_page != min_pages)){
			 current_page--;
		  }

		 		var id_mas = [];

				var data = {
					'action': 'loadmore',
				  'query': true_posts,
					'page' : current_page,
					'category' : current_category
				};

				$.ajax({
					url:ajaxurl,
					data:data,
					type:'POST',
						success:function(data){

					if(data){
				 		if(current_category == ''){
						$("#content").html(data);
			 			} else {

						function getDataArray(){
							var ourRequest = new XMLHttpRequest();
							var data1;
							ourRequest.open('GET', '/wp-json/wp/v2/PTposts?categories='+current_category);
						  ourRequest.onload = function(){
						    if (ourRequest.status >= 200 && ourRequest.status < 400){
						      data1 = JSON.parse(ourRequest.responseText);
						      getIds(data1);
						    } else {
						      console.log("error");
						    }
						  };
						  ourRequest.onerror = function(){
						  console.log("conn error");
						  };
						  ourRequest.send();

							function getIds(postsData){
								for (var i = 0; i < postsData.length; i++){
									id_mas.push(postsData[i].id);
								}
							  return [id_mas, postsData[i]];
								// id_mas.forEach(function(current_page, id_mas){
								// 	if(postsData[i].id == id_mas[current_page]){
								// 		ourHTMLString += '<h1 class="archive-page-header text-center">' + postsData[i].title.rendered + '</h1>';
								// 		ourHTMLString += postsData[i].content.rendered;
								// 	}
								// 	// return ourHTMLString;
								// 	console.log(123);
								// });
				      }
				    // return postsData;
			     }

						console.log(getDataArray());
						// console.log(id_mas);
						// console.log(postsData);
							var ourHTMLString = '';
							  // for (var i = 0; i < current_page; i++){
							  // }
								//
									// if(postsData[i].id == id_mas[current_page]){
								// 		ourHTMLString += '<h1 class="archive-page-header text-center">' + postsData[i].title.rendered + '</h1>';
								// 		ourHTMLString += postsData[i].content.rendered;
								// 	}
								// $("#content").html(ourHTMLString);

							id_mas.forEach(function(item, current_page){
								if(postsData[i].id == item){
									ourHTMLString += '<h1 class="archive-page-header text-center">' + postsData[i].title.rendered + '</h1>';
									ourHTMLString += postsData[i].content.rendered;
								}
								// return ourHTMLString;
								console.log(123);
							});
						$("#content").html(ourHTMLString);
					}
				}
			}
		});
	});
});
