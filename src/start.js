/**
 *  测试链接样本
 *  http://192.168.0.5:8905/bin/index.html?video=game/game.m3u8&title=m3u8视频
*/
function getUrlParams(url,key) {
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
    var result = url.substr(1).match(reg);
    if (result != null) {
        return decodeURIComponent(result[2]);
    } else {
        return null;
    }
}
//计算相对目录
var rootUrl = window.location.href;
//获取参数值的
var url1 = rootUrl;
var i = url1.indexOf("?");
if(i != -1) url1 = url1.slice(i,url1.length);
//[mp4 m3u8 flv]格式  对应的资源类型[mp4 hls flv]
/**
 * mp4视频  最原始资源,移动端虽可以访问但很慢，适合pc
 * m3u8视频  流媒体视频,所有平台都适合，需要mp4转m3u8,转换可用ffmpeg,详情自己百度
 * flv视频  只适合pc端
 */
var m3u8Res = getUrlParams(url1,"video");
//定义默认格式
var resType = "hls";
if(m3u8Res.indexOf(".flv") != -1) resType = "flv";
if(m3u8Res.indexOf(".mp4") != -1) resType = "mp4";
//动态修改标题
var title = getUrlParams(url1,"title");
if(!title) title = "视频";
$('title').html(title);
//document.getElementsByTagName("title")[0].innerText = 'innerText我是原生js方法';	

//访问相对路劲
var pos = rootUrl.lastIndexOf("index.html");
var resRootUrl = rootUrl.substring(0,pos);
var len = window.location.origin.length;
var resDir = resRootUrl.substr(len+1,resRootUrl.length);
//配置视频的信息
var hosts = '';
var danmuenable = 0; //需要弹幕
var magnet = ""; //磁力链接
var redirecturl = window.location.origin;
var videoid = '';
var id = '';
var l = ''; //前置广告
var r = '';
var t = '15';
var d = ''; //后置广告
var u = '';
var main = resDir + m3u8Res; // "game/game.m3u8";
var playertype = 'dplayer'; // dplayer || ckplayer
var mp4 = resDir + m3u8Res;  // "game/game.m3u8";
var xml = "";
var pic = "";
$(function () {
    var t = BrowserType();		
    if (t && t.indexOf("IE") >= 0)
        playertype = "ckplayer";
    var order = 0;
    init(order);
});