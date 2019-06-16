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

							var ourHTMLString = '';

							function getIds(postsData){
								postsData.forEach(function(item, index, postsData){
									id_mas.push(postsData[index].id);
								});

								if(postsData[current_page].id == id_mas[current_page]){
									ourHTMLString += '<h1 class="archive-page-header text-center">' + postsData[current_page].title.rendered + '</h1>';
									ourHTMLString += postsData[current_page].content.rendered;
								}
								 return $("#content").html(ourHTMLString);
					    }
			      }
					 getDataArray();
					}
				}
			}
		});
	});
});
