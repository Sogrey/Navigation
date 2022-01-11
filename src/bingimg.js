    var current_page = 1;
    var current_img_index = 0;
    var img_info_list = [];

    function bind_img_info() {
        //console.log("bind_img_info " + current_img_index+"/"+(img_info_list.length-1));
        $("#div_bg").css("background-image", "url(../static/downimg/" + img_info_list[current_img_index].url + ")");
        $("#a_img_down").attr("href", "../down/" + img_info_list[current_img_index].url);
        $("#a_img_down_uhd").attr("href", "../down/uhd/" + img_info_list[current_img_index].url_uhd);
        if (img_info_list[current_img_index].url_uhd != "") {
            $("#a_img_down_uhd").css("display", "inline-block");
        } else {
            $("#a_img_down_uhd").css("display", "none");
        }

        $("#a_img_copyright").attr("title", img_info_list[current_img_index].copyright);
        $("#a_img_copyright").attr("href", img_info_list[current_img_index].copyrightlink);
    }

    function get_img_info(next_page) {
        $.ajax({
            type: "GET",
            url: "/dj_get_img_info?page=" + current_page,
            dataType: "json",
            success: function (res) {
                if (res.code == 0) {
                    //console.log('get_img_info success current_page='+current_page)
                    if (res.data_list && res.data_list.length > 0) {
                        img_info_list = res.data_list;
                        if (next_page) {
                            current_img_index = img_info_list.length - 1;
                        } else // pre page
                        {
                            current_img_index = 0;
                        }
                        bind_img_info();
                    } else { // reset
                        if (next_page) {
                            current_img_index = 0;
                            current_page++;
                        } else {
                            current_img_index = img_info_list.length - 1;
                            current_img_index = current_img_index < 0 ? 0 : current_img_index;
                            current_page--;
                        }
                    }
                } else {
                    //console.log('error!') 
                }
            }
        });
    }

    $("#next_img").click(function () {
        //console.log("next img")
        current_img_index--;
        if (current_img_index < 0) {
            current_img_index = 0; // index==0 is newest img
            current_page--;
            if (current_page < 1) {
                current_page = 1;
                //console.log("current_page < 1, init to 1");
                return;
            }
            get_img_info(true);
        } else {
            bind_img_info();
        }

    });

    $("#pre_img").click(function () {
        //console.log("pre img")
        current_img_index++;
        if (current_img_index >= img_info_list.length) {
            current_page++;
            get_img_info(false);
        } else {
            bind_img_info();
        }
    });

    $(function ($) {
        $(document).on('keydown', function (e) {
            e = e.event || window.event;
            if (e.keyCode == 123 || (e.ctrlKey && e.shiftKey && e.keyCode == 73) || (e.ctrlKey && e.keyCode == 85)) return false
        })

        $("#div_bg").css("background-image", "url(../static/downimg/OHR.FanjingStairs_ZH-CN0360402048_1920x1080.jpg)");
        get_img_info(false);
    });