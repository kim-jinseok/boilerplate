import axios from 'axios'

export default {
    install(Vue) {

        window.fw = function() {

        }


        fw.getCategory = async function(param) {

            try {
                const result = await axios.post('/api/ajax/CategoryData', param);

                return result.data

            } catch (err) {


            }
        }

        fw.getBoard = async function(param) {
                
            try {
                const result = await axios.post('/api/ajax/BoardData', param);
                // console.log(result)
                console.log('framework')
                return result.data

            } catch (err) {


            }
        }

        fw._previewRender = async function($container, m, isPopupType) {

            console.log('_previewRender')
            console.log(m)
            
            if (helper.isNull(m)) { $container.html('<div style="margin:30px;"><h3>미리보기를 불러오는 중입니다.</h3></div>'); return false; }
            
            if (!helper.isNull(m[1])) {

                var v = m[1][0];
                var file_type = helper.getExtension(v.file_name);
                var btnHtml = "";

                if (!isPopupType) { $container.show(); }

                $("#dvDrawContainer").hide();


                if (v.pdf_converter == "hoops") {
                    var fileExt = helper.getExtension(v.file_path);
                    var previewExt = helper.getExtension(v.preview_path);

                    //hoops 변환을 사용하지 않을때, 확장자가 image로 봐야할 경우, 변환된 미리보기 파일이 jpg일 경우
                    if (!helper.getSafeBoolean(base.useDrawingViewer) || helper.chkDrawingImgFile(fileExt) || previewExt == "jpg") {
                        //alert(helper.rpc(v.preview_path, "/html/", "/jpg/"));
                        //case 1. hoops 변환을 사용하고 변환을 한 경우 html로 파일이 생성된다. 다만 이름은 랜덤값이 입력된다. 파일명.html이 아니다. 해서 preview_path를 사용하지 못함.
                        //case 2. hoops 변환을 사용하지 않고 변환을 하면 preview_path에는 jpg 파일로 생성된다.
                        //case 3. hoops 변환을 사용하지만 변환 대상이 아닐 경우 preview_path에는 jpg 파일로 생성된다.
                        //따라서 아래와 같이 1번 case 때문에 실제 파일경로에서 replace를 했다.

                        $container.html("<img src='" + helper.setChangeFileExtension(helper.rpc(v.file_path, "/" + fileExt+"/", "/jpg/"), "jpg") + "' style='width:100%; ' />");
                        $("#dvPdfContainer").show();
                        return;
                    }

                    if (helper.getSafeStr(v.pdf_convert_state, "") == "변환대기") {
                        if (!isPopupType) $container.html('<div style="margin:30px;"><h3>미리보기 준비중</h3> <img src="/Content/images/index.discuss-ellipsis-preloader.gif" /></div>');
                        return;
                    } else if (helper.getSafeStr(v.pdf_convert_state, "") == "진행중") {
                        if (!isPopupType) $container.html('<div style="margin:30px;"><h3>미리보기 생성중</h3> <img src="/Content/images/index.discuss-ellipsis-preloader.gif" /></div>');
                        return;
                    } else if (helper.getSafeStr(v.pdf_convert_state, "") == "변환실패11") {
                        if (!isPopupType) $container.html('<div style="margin:30px;"><h3>미리보기가 없습니다.</h3>' + btnHtml + '</div>');

                        return;
                    }

                    if (!isPopupType) { $container.hide(); }

                    var href = "";


                    //if (helper.chkDrawingFile(file_type)) {
                    //    href = helper.rpc(helper.setChangeFileExtension(c, "html"), "#", "%23");
                    //} else {
                    //    href = v.preview_path;
                    //}
                    href = v.preview_path;

                    $("#dvDrawPreview").attr("src", "")
                    $('#dvDrawLoading').remove();
                    $("#dvDrawContainer").show();
                    $("#dvPdfTitle").html("<a class='btn btn-primary'  href='" + href + "' target='_blank;'><i class='icon fa fa-window-restore'> 새창열기</a>")


                    $.get(href)
                        .done(function () {
                            if (isPopupType) {

                                $._popupCenter(href, "미리보기", 1000, 800);
                            }
                            else {
                                $("#dvDrawPreview").attr("src", href);
                            }
                        }).
                        fail(function (xhr) {

                            if (!isPopupType) {
                                $container.html('<div style="margin:30px;"><h3>미리보기가 없습니다.</h3></div>');
                                return false;
                            } else {
                                alert("미리보기를 할 수 없습니다.");
                                return false;
                            }
                        });
                } else {


                    switch (file_type) {
                        case "jpeg":
                        case "jpg":
                        case "psd":
                        case "tif":
                        case "webp":
                        case "png":
                        case "gif":
                        case "bmp":
                            $.get("/WebHandler/PdfViewerHandler.ashx?fileHistoryId=" + v.file_history_id + "", function (data) {
                                $container.html("<img src='data:image/" + file_type + ";base64," + data + "' style='width:100%; ' />");
                            });
                            return true;
                            break;
                        case "mp4":
                            if (!isPopupType) $container.html('<video src=\'' + v.file_path + '\' width="640px" height="380px" autoplay />');
                            return true;
                            break;
                    }


                    var btnHtml = '<div class="fileinput fileinput-new" data-provides="fileinput">\
                                       <span class="btn btn-default btn-file"><span class="fileinput-new"><i class="fa fa-plus"></i> 미리보기 업로드</span><span class="fileinput-exists">파일변경</span>\
                                       <input type="hidden"><input type="file" name="" class="edPreviewUpload" accept=".pdf">\
                                       </span>\
                                       <span type="button" class="btn btn-primary fileinput-exists btPreivewUpload" preview="main" file_history_id=' + v.file_history_id + '>업로드</span>\
                                       <span class="fileinput-filename"></span>\
                                   </div>';



                    if (helper.getSafeStr(v.pdf_convert_state, "") == "진행중") {
                        if (!isPopupType) $container.html('<div style="margin:30px;"><h3>미리보기 준비중</h3> <img src="/Content/images/index.discuss-ellipsis-preloader.gif" /></div>');
                    } else {
                        if (!isPopupType) $container.html('<div style="margin:30px;"><h3>Preview Loading</h3> <img src="/Content/images/index.discuss-ellipsis-preloader.gif" /></div>');
                    }



                    if ($.trim(helper.getSafeStr(v.pdf_stream_id, "")) != "" && v.pdf_convert_state == "변환성공") {

                        //$container.html('<iframe id="dvPdfIframe" class="lazy" src="/Home/PDFViewer?fileHistoryId=' + v.file_history_id + '"  onload="$.calcHeight(this);" frameborder="0" scrolling="no" style="overflow-x:hidden; overflow:auto; width:100%; min-height:500px;"></iframe>');

                        var pdfUrl = helper.setChangeFileExtension(v.preview_path, "pdf");


                        var url = '/Scripts/vendor/viewer/viewer.html?file=' + encodeURIComponent(pdfUrl) + '&uid=' + escape(user.user_id) + '&sid=' + escape(user.sessionId) + '&ran=' + Math.random(4) + '';

                        $.get(pdfUrl)
                            .done(function () {
                                if (isPopupType) {
                                    $._popupCenter(url, "미리보기", 1000, 800);
                                } else {
                                    $container.html('<iframe class="lazy"  id="dvPdfIframe" src="' + url + '" onload="$.calcHeight(this);" frameborder="0" scrolling="no" style="overflow-x:hidden; overflow:auto; width:100%; min-height:500px;"></iframe>');
                                }
                            }).
                            fail(function (xhr) {

                                //$("#dvPdfTitle").html("");
                                if (!isPopupType) {
                                    $container.html('<div style="margin:30px;"><h3>미리보기가 없습니다.</h3>' + btnHtml + '</div>');
                                }

                                return false;
                            });

                    }
                    else {

                        if (helper.getSafeStr(v.pdf_convert_state, "") == "진행중") { $container.html('<div style="margin:30px;"><h3>미리보기 준비중</h3>' + btnHtml + '</div>'); }
                        else {
                            if (!isPopupType) {
                                $container.html('<div style="margin:30px;"><h3>미리보기가 없습니다.</h3>' + btnHtml + '</div>');
                                return false;
                            } else {
                                alert("미리보기를 할 수 없습니다.");
                                return false;
                            }
                        }
                    }
                }
            }
        }
    }
}