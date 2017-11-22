/**
 * Created with JetBrains PhpStorm.
 * Date: 11/16/17
 * Time: 5:13 PM
 * To change this template use File | Settings | File Templates.
 */

$Window.Body.Mining = new Object();

$Window.Body.Mining.Init = function(){
    $("#windows_mining_threads").attr("disabled", "disabled");
    $RPC.Api.mainProcessSend({"method":"get_cpu"}, function(res){
        if(res.length>0){
            $("#windows_mining_threads").html('');
            for(var i in res){
                var html = '<option value="'+  (parseInt(i)+1) +'">'+ (parseInt(i)+1) +'</option>';
                $("#windows_mining_threads").append(html);
                $("#windows_mining_threads").val(parseInt(i)+1);
            }
        }
        $("#windows_mining_threads").removeAttr("disabled");
    });

    $('#window_mining_start').unbind();
    $('#window_mining_start').click(function(e){
        e.preventDefault();
        var threads = parseInt($("#windows_mining_threads option:selected").val());
        $RPC.Api.StartMining(threads, function(){
            $Window.Notify.Add($Window.GetVar('mining_started'), 'ok', 10000);
        },
        function(){
            $Window.Notify.Add($Window.GetVar('mining_start_error'), 'error', 10000);
        });
    });

    $('#window_mining_stop').unbind();
    $('#window_mining_stop').click(function(e){
        e.preventDefault();
        $RPC.Api.StopMining(function(){
            $Window.Notify.Add($Window.GetVar('mining_stop'), 'ok', 10000);
        });
    });
};


