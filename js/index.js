

	
	//获取当前城市的天气信息
	let weather;
	$.ajax({
		type:"get",
		url:"https://www.toutiao.com/stream/widget/local_weather/data/?city",
		dataType:"jsonp",
		success:function(obj){
			console.log(obj);
			weather = obj.data.weather;
			console.log(weather);
			updata(weather);
		},
	});
	
	//获取天气数据的函数
	function updata (weather){
		//获取当前的城市
		$(".city").html(weather.city_name);
		//获取当前城市的空气情况
		$(".kongqi h2").html(weather.quality_level);
		//获取当前的温度
		$("header h3").html(weather.current_temperature+"°");
		//获取当前的天气情况
		$("header h4").html(weather.current_condition);	
		//获取当前风向
		$(".shidu h5").html(weather.wind_direction);
		//获取当前风力
		$(".shidu div").html(weather.wind_level+"级");
		
		//今天天气
		//最高温
		$("#dat_high_temperature").html(weather.dat_high_temperature);
		//最低温
		$("#dat_low_temperature").html(weather.dat_low_temperature+"°");
		//天气情况
		$(".tady .tady_bottom .text").html(weather.dat_condition);
		//今天icon
		$("#dat_weather_icon_id").css({"background":"url(img/"+weather.dat_weather_icon_id+".png) no-repeat center" , "background-size":"cover"});
	
		//明天天气
		//最高温
		$("#tomorrow_high_temperature").html(weather.tomorrow_high_temperature);
		//最低温
		$("#tomorrow_low_temperature").html(weather.tomorrow_low_temperature+"°");
		//天气情况
		$(".tomorrow .tady_bottom .text").html(weather.tomorrow_condition);
		//明天icon
		$("#tomorrow_weather_icon_id").css({"background":"url(img/"+weather.tomorrow_weather_icon_id+".png) no-repeat center" , "background-size":"cover"});
	
		//准点天气
		let str = "";	
		if (!weather.hourly_forecast){
			return;
		}
		weather.hourly_forecast.forEach(function(v,i){
	        str = str+`
	            <div class="now">
	                <h2 class="now_time">${v.hour}:00</h2>
	                <div class="now_icon" style="background-image:url(img/${v.weather_icon_id}.png)"></div>
	                <h2 class="now_wendu">${v.temperature}°</h2>
	            </div>    
	            `
	    })
	    $(".zhundian_box").html(str);
	    
	    //最近天气
	    let jinqi = "";
		weather.forecast_list.forEach(function(v,i){
	    	jinqi=jinqi+`
	            <div class="con">
	                <div class="con_date">
	                    ${v.date.slice(5, 7)}/${v.date.slice(8)}
	                </div>
	                <div class="con_yunH">${v.condition}</div>
	                <div class="con_imgH" style="background-image:url(img/${v.weather_icon_id}.png)"></div>
	                <h2 class="con_high">${v.high_temperature}°</h2>
	                <h3 class="con_low">${v.low_temperature}°</h3>
	                <div class="con_imgL" style="background-image:url(img/${v.weather_icon_id}.png)"></div>
	                <div class="con_yunL">${v.condition}</div>
	                <div class="con_feng">${v.wind_direction}</div>
	                <div class="con_fengji">${v.wind_level}</div>
	            </div>  
	            `
		})
   		$(".jinqi_box").html(jinqi);
		
	}
	
	$(".city").click(function () {
		$(".location").css({"display":"block"});
		$(".hide").css({"display":"none"});
	});
	$(".title i").click(function(){
		$(".location").css({"display":"none"});
		$(".hide").css({"display":"block"});
	});
	
	
	let city;
	$.ajax({
	    url: 'https://www.toutiao.com/stream/widget/local_weather/city/',
	    type: 'get',
	    dataType: 'jsonp',
	    success:function(obj){
	        console.log(obj);
	        city=obj.data;
	        console.log(city);
	        renderCity(city);
	    },
	})
	function renderCity(city){
    // 城市搜索  
	   let k=0;
		for(let i in city){
			let strp=`<div class="remen_city jia">
			            <div class="remen_text">${i}</div> 
			            <div class="city_list">
			                 <ul id="zhongyao_city"> 
			                     
			                 </ul> 
			            </div>
			        </div>`
			$(".remen").append(strp);
			for(let j in city[i])
			{
				let strc=`<li id="location_city"> 
	                         <div class="city1">${j}</div> 
	                     </li>`
				
				$(".remen_city.jia ul").eq(k).append(strc);
			}		    
			k++;
		}
	}
	//城市获取方法二
	/*function renderCity() {
	    let k = 0;
	    $.each(city,function (indexs,vals) {
	        let str = `<div class="remen_city jia">
				            <div class="remen_text">${indexs}</div> 
				            <div class="city_list">
				                 <ul id="zhongyao_city"> 
				                     
				                 </ul> 
				            </div>
				        </div>`;
	        $(".remen").append(str);
	        $.each(vals,function (i) {
	            let str1 = `<li id="location_city"> 
		                         <div class="city1">${i}</div> 
		                     </li>`;
	            $(".remen_city.jia ul").eq(k).append(str1);
	        })
	    });
	    k++;
	}*/
	
	
	//获取天气信息的函数封装
	function ajaxs(str){
	    let url1="https://www.toutiao.com/stream/widget/local_weather/data/?city="+str;
	    let tianqi1;
	    $.ajax({
	        url:url1,
	        dataType:"jsonp",
	        type:"get",
	        success:function(obj){
	            let tianqi1=obj.data.weather;
	            updata(tianqi1);
	        }
	    });
	}

// 所有数据加载完成后执行
window.onload = function () {
    // 点击每个城市，获取当前城市的天气信息
    $(".remen .city1").click(function () {
        let con = $(this).html();
        ajaxs(con);
        $(".location").css({"display":"none"});
		$(".hide").css({"display":"block"});
    })
    // 点击搜索框，输入搜索内容
    $(".location .search input").focus(function () {
        $(".search_right").html("搜索");
    });
    $(".location .search input").blur(function () {
        $(".search_right").html("取消");
    });
    // 点击搜索时获取input中的内容进行搜索
    $(".search_right").click(function () {
        $.each(city,function (indexs,vals) {
            $.each(vals,function (i) {
                if ($(".location .search input").val() == i) {
                    ajaxs($(".location .search input").val());
                    $(".location").css({"display":"none"});
					$(".hide").css({"display":"block"});

                }
                
            })
        })
        alert("请输入正确的城市名称");
    });
}
	
	
	

