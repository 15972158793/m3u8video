function mplayer() {
    this.prefix = "http://localhost:1220"
}
/**
 * 检测是否具备执行环境
 */
mplayer.prototype.isReady = function (callback) {
    $.ajax({url : this.prefix, timeout : 1000})   
    .done(function () {
        callback()
    }).fail(function () {
            callback("no")
    });
}

/**
 * 启动magnet 播放
 * 如果得到的代理的url ，那么callback 此url
 */
mplayer.prototype.play = function (magnetUrl, callback) {
    $.get(this.prefix + "/api/play?url=" + encodeURIComponent(magnetUrl)).done(function (data) {
        if (data.err_code == 0)
            callback(null, data.url);
        else
            callback(data.desc);
    })
}

window.MPlayer = new mplayer();