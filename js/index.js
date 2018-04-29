$(document).ready(function(){

	// 將原本 wrapper 的 height 記錄起來
	var origin_height = $('.wrapper').height();
	
	// 設定 wrapper 在 hover 和沒有 hover 的 height
    $(".picture").hover(
    	function () {
			reload_wrapper_height();
      	}, 
		function () {
			$('.wrapper').height( origin_height );
      	}	
	);
	
	function reload_wrapper_height(){
		var leng = $('.comment').length;
		console.log(leng);
		if(leng>3){
			$('.wrapper').height( origin_height+(leng-3)*28 );
		}
	}

	// 愛心點擊事件綁定
	$('.action.like').click(function(event) {
		event.preventDefault();
		if($(this).hasClass('active')){
			$(this).removeClass('active');
			var like_count = parseInt($('.like_count span').text(),10);
			$('.like_count span').text(like_count-1);

			// 從說讚的用戶移除
			$('#like_list .modal_content_body').find('.username').each(function(index, el) {
				if($(this).data('username')=='passerby'){
					$(this).closest('.like_member').remove();
				}
			});
			
		}else{
			$(this).addClass('active');
			var like_count = parseInt($('.like_count span').text(),10);
			$('.like_count span').text(like_count+1);

			// 新增至說讚的用戶
			$('#like_list').find('.modal_content_body').append(
				`<div class="like_member">
					<div class="user_photo">
						<a>
							<img src="https://scontent-lga3-1.cdninstagram.com/vp/856b9478629f7c2f4ae549c4c8cc5dd7/5B94597A/t51.2885-19/11906329_960233084022564_1448528159_a.jpg" alt="">
						</a>
					</div>
					<div class="user">
						<a class="username" data-username="passerby">
							passerby
						</a>
						<div class="user_name">
							路人
						</div>
					</div>
				</div>`
			);
		}	
	});

	// 新增留言點擊事件綁定
	$('.action.add_new_comment').click(function(event) {
		event.preventDefault();
		$('.new_comment').show();
	});

	// 留言按鈕顏色根據 input 改變
	$('.my_form_control_input').keyup(function(event) {
		if($(this).val()!=''){
			$(this).next().removeClass('my_form_control_btn_disable');
		}else{
			$(this).next().addClass('my_form_control_btn_disable');
		}
	});

	// 提交留言事件處理
	$('#submit_comment').submit(function(event) {
  		event.preventDefault();
  		var new_comment = $('#new_comment_input').val();
  		if(new_comment!=""){
  			$('#new_comment_input').val("");
	  		$('.comments').append(`
					<div class="comment">
						<a class="username" passerby>
							passerby
						</a>
						<span>
							${new_comment}
						</span>
						<span class="delete">x</span>
					</div>
	  			`).children().last().show();
  		}

  		// 重新計算捲軸長度
  		reload_wrapper_height();
		// 捲軸至底部  		
  		window.scrollTo(0,document.body.scrollHeight);
	});

	// 刪除留言事件綁定
	$('.comments').on('click', '.delete' ,function(event) {
		$(this).parent().remove();
	});

	// 查看更多留言事件綁定
	$('.more_comments').click(function(event) {
		$(this).hide();
		$(this).next().children().show();
	});

	// 查看說讚的用戶
	$('.like_count').click(function(event) {
		$('#like_list').show();
	});

	// 追蹤按鈕事件綁定
	$('.follow .is_follow').click(function(event) {
		if($(this).hasClass('unfollow')){
			$(this).text('追蹤');
			$(this).removeClass('unfollow');
		}else{
			$(this).text('追蹤中');
			$(this).addClass('unfollow');
		}
	});

	// 關閉modal
	$('.modal .close').click(function(event) {
		close_modal(this);
	});

	$('.modal').click(function(event) {
		if($(event.target).hasClass('modal')){
			close_modal(this);
		}
	});

	function close_modal(event){
		$(event).closest('.modal').hide();
	}

});