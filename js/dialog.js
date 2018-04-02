(function(window) {
    var btnsure = '',
        btncancel = '',
        width, content, time, callback;

    function posContentDialog(obj) {
        var clientX = document.body.clientWidth;
        var clientY = document.body.clientHeight;
        var width = obj.width();
        var height = obj.height();
        if (clientX < width) {
            clientX = width;
            $('body').find('.dialog').last().width($(document).width());
            $('body').find('.dialog').last().width($(document).height())
        }
        if (clientY < height) {
            clientY = height;
            $('body').find('.dialog').last().width($(document).width());
            $('body').find('.dialog').last().width($(document).height())
        }
        obj.css({
            left: (clientX - width) / 2,
            top: (clientY - height) / 2
        })
    }

    function Sure(callback) {
        $('body').on('click', '.sure', function() {
            callback();
            $(this).parents('.dialog').remove()
        })
    }

    function Cancel(callback) {
        $('body').on('click', '.cancel', function() {
            if (callback != false) {
                if (!callback()) {
                    callback();
                }
            }
            $(this).parents('.dialog').remove()
        })
    }

    function Cancel1() {
        $('body').on('click', '.cancel1', function() {
            $(this).parents('.dialog').remove()
        })
    }

    function lineHeight(obj) {
        obj.css('line-height', obj.height() + 'px')
    }
    class dialog {
        constructor(content, width, btnSure, btnCancel, callback, time) {
            this.content = content,
                this.width = width,
                this.btnSure = btnSure,
                this.btnCancel = btnCancel,
                this.callback = callback,
                this.time = time
        }

        whetherDialog() {
            if (this.btnSure) {
                btnsure = this.btnSure[0].value;
                Sure(this.btnSure[0].callback)
            } else {
                btnsure = '确认'
            }
            if (this.btnCancel) {
                btncancel = this.btnCancel[0].value;
                Cancel(this.btnCancel[0].callback)
            } else {
                btncancel = '取消';
                Cancel(false);
            }
            width = (this.width || 300) + 'px';
            var dialog = "<div class='dialog'> <div class='dialog-shadow'></div> <div class='dialog-content' style='width:" + width + "'><div class='title'>" + this.content + "</div><div class='dialog-footer'> <button class='sure'>" + btnsure + "</button><button class='cancel'>" + btncancel + "</button></div></div></div>";
            $('body').append(dialog);
            var obj = $('body').find('.dialog').last();
            posContentDialog(obj.find('.dialog-content'))
        };
        nobtnDialog() {
            width = (this.width || 150) + 'px';
            var dialog = " <div class='dialog' style='z-index:999'><div class='dialog-shadow'></div> <div class='dialog-content' style='width:" + width + "'>" + this.content + "</div></div>";
            $('body').append(dialog);
            var obj = $('body').find('.dialog').last();
            posContentDialog(obj.find('.dialog-content'));
            lineHeight(obj.find('.dialog-content'));
            time = this.time || 1500;
            setTimeout(function() {
                obj.remove()
            }, time)
        }
        onebtnDialog() {
            width = (this.width || 300) + 'px';
            btncancel = this.btnCancel || '关闭';
            var dialog = " <div class='dialog'><div class='dialog-shadow'></div> <div class='dialog-content' style='width:" + width + "'><div class='title'>" + this.content + "</div><div class='dialog-footer'><button class='cancel'>" + btncancel + "</button></div></div></div> ";
            $('body').append(dialog);
            var obj = $('body').find('.dialog').last();
            posContentDialog(obj.find('.dialog-content'));
            Cancel(false);
            time = this.time || 1500;
            setTimeout(function() {
                obj.remove();
            }, time)
            if (this.callback) {
                this.callback();
            }
        }
    }
    window.dialog = {
        twoBtnDialog: function(content, width, btnSure, btnCancel) {
            new dialog(content, width, btnSure, btnCancel).whetherDialog()
        },
        oneBtnDialog: function(content, width, btnCancel, callback, time) {
            new dialog(content, width, '', btnCancel, callback, time).onebtnDialog()
        },
        noBtnDialog: function(content, width, time) {
            new dialog(content, width, '', '', '', time).nobtnDialog()
        }
    }, window.onresize = function() {
        posContentDialog($('.dialog-content'))
    }, window.onscroll = function() {
        var clientX = document.body.scrollWidth;
        var clientY = document.body.scrollHeight;
        $(".dialog-shadow").css({
            'width': clientX,
            'height': clientY
        });
        posContentDialog($('.dialog-content'))
    }
}(window))