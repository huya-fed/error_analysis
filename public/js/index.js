/*
* @Author: xiejinlong
* @Date:   2017-05-25 17:30:18
* @Last Modified by:   xiejinlong
* @Last Modified time: 2017-05-26 10:59:29
*/

var errdetail = document.getElementById('errdetail');
var errHeader = document.getElementById('errHeader');

function encodeHTML(str) {
        if(!str || str.length == 0) return "";
        return str.replace(/&/g, "&#38;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\'/g, "&#39;");
    }


layui_form.on('submit(errorForm)', function(data){


    $.ajax({
        url: "/errorReport",
        data: data.field,
        dataType: 'json',
        type: 'POST',
        success: function(data){
             var lines = data.file.split('\n');
            
            var row = data.row,
                len = lines.length - 1;

            var start = row - 3 >= 0? row - 3: 0,
                end = start + 5 >= len? len: start + 5; // 最多展示6行

            var newLines = [];
            for(var i = start; i <= end; i++) {
                newLines.push('<div class="code-line '+ (i + 1 == row? 'heightlight': '')+'" title="'+ (i + 1 == row? encodeHTML(data.msg): '')+'">' + (i+1) + '.    ' + encodeHTML(lines[i]) + '</div>');
            }
            errdetail.innerHTML = '<div class="errheader">' + data.source + ' at line ' + data.row + ':' + data.column + '</div>' + 
                '<pre class="errCode">' + newLines.join("") + '</pre>';
        },
        error : function(){
            errdetail.innerHTML = '<p style="text-align: center;padding: 100px 0;">服务器出错!</p>'
        }
    });

	return false;
});