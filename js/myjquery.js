// JavaScript Document
$(document).ready(function()
{
	var queuedImageIndex = 0;
	var featuredImageIndex = 0;
	
	var serverImages = [];
	
	function cycleImageForward()
	{
		$(".queued_image").each(function(queuedImageIndex)
		{
			this.remove();
		});
		var html = "";
		for(var i = 0; i < 4; i++)
		{
			if(i === 0)
			{
				if(serverImages[i].original_name !== null)
				{
					featuredImageIndex = featuredImageIndex + 1;
					$("#currently_featured_image").attr("src", "uploads/"+ serverImages[featuredImageIndex].original_name);
				}
			}
			else
			{
				if(serverImages[i].original_name !== null)
				{
					queuedImageIndex = queuedImageIndex + 1;
					html += "<img class='queued_image' src='uploads/" + serverImages[i+1].original_name + "'>";
				}
			}
		}
		
		$("#image_queue").append(html);
	}
	
	function cycleImageBackward()
	{
		$(".queued_image").each(function(queuedImageIndex)
		{
			this.remove();
		});
		var html = "";
		for(var i = 0; i < 4; i++)
		{
			if(i === 0)
			{
				if(serverImages[i].original_name !== null)
				{
					featuredImageIndex = featuredImageIndex - 1;
					$("#currently_featured_image").attr("src", "uploads/"+ serverImages[featuredImageIndex].original_name);
				}
			}
			else
			{
				if(serverImages[i].original_name !== null)
				{
					queuedImageIndex = queuedImageIndex - 1;
					html += "<img class='queued_image' src='uploads/" + serverImages[i-1].original_name + "'>";
				}
			}
		}
		
		$("#image_queue").append(html);
	}
	
    $("#previous_image").click(function()
	{
		cycleImageBackward();
//		
//    	$("#previous_image").click(function()
//		{
//			cycleImageBackward();
//    	});
//	
//		$("#next_image").click(function()
//		{
//			cycleImageForward();
//		});
    });
	
	$("#next_image").click(function()
	{
		cycleImageForward();
//		
//    	$("#previous_image").click(function()
//		{
//			cycleImageBackward();
//    	});
//	
//		$("#next_image").click(function()
//		{
//			cycleImageForward();
//		});
	});
	
    $.get("plugins/php/get-images-from-server.php", function(result)
	{
		serverImages = result;
		var html = "";
		for(var i = 0; i < serverImages.length; i++)
		{
					html += "<img class='queued_image' src='uploads/" + serverImages[i].original_name + "'>";
		}
		$("#image_queue").append(html);
	});
});