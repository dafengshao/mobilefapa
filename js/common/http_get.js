var httpGet = function(url) {
				var URL = plus.android.importClass("java.net.URL");
				var URLConnection = plus.android.importClass("java.net.URLConnection");
				var BufferedReader = plus.android.importClass("java.io.BufferedReader");
				var InputStreamReader = plus.android.importClass("java.io.InputStreamReader");
				var StrictMode = plus.android.importClass("android.os.StrictMode");
				//以下两句必加，不然会请求不了网络，原因：
				//android3.0版本开始就强制程序不能在主线程中访问网络，要把访问网络放在独立的线程中。
				//以下两句可以忽略这些强制策略。
				var policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
				StrictMode.setThreadPolicy(policy);
				var httpConn = new URL(url).openConnection();
				
				// 设置通用属性
				httpConn.setRequestProperty("Accept", "*/*");
				httpConn.setRequestProperty("Content-Type", "text/html");
				httpConn.setRequestProperty("Connection", "Keep-Alive");
				//设置Cookie
				//httpConn.setRequestProperty("Cookie", cookies);
				httpConn.setRequestProperty("User-Agent", "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1)");
				// 建立实际的连接
				httpConn.connect();

				//----------------获取输出 start----------------//
				var reader = new BufferedReader(new InputStreamReader(httpConn.getInputStream(), "UTF-8"));
				var lines;
				//输出数据
				var response = "";
				
				while((lines = reader.readLine()) != null) {
					
						//lines = lines.replace(/240x180/g, "320x200");
						//lines = lines.replace(/onmouseover/g, "over");
						//lines = lines.replace(/onmouseout/g, "out");
						var startstr = "video_alt_url:";
						var endstr = "video_alt_url_text";
						var start = startstr.length+2;
						var i = lines.indexOf(startstr);
						var e = lines.indexOf(endstr)-3;
						if(i>0){
							console.log(i);
							console.log(e);
							lines = lines.substring(i+start,e);//4051
							console.log(lines);
							return lines;
						}
						
						//response += lines;
						
				
				}
				reader.close();
				//return response;
				/*var Intent = plus.android.importClass("android.content.Intent");
                var Uri = plus.android.importClass("android.net.Uri");
                var main = plus.android.runtimeMainActivity();
                var intent = new Intent(Intent.ACTION_VIEW);
                var uri = Uri.parse("https://fapality.com/get_file/1/58149f4d707c2c3bda2c9bb522b75844/18000/18578/18578_480p.mp4");
                intent.setDataAndType(uri, "video/*");
                main.startActivity(intent);*/
			
			}