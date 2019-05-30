$(function () {
    function FilamentViewModel(parameters) {
        var self = this;

        const msgDiv = `<div id="msg-no-filament" style="display:none;" class="row-fluid">No filament detected. Resume disabled.</div>`
        $("#state").children()[0].innerHTML += msgDiv;
        const msgElem = $("#msg-no-filament");


        self.onFilamentChanged = function (filamentStatus) {
            var bttnDisabled = filamentStatus === 0 ? true : false;
            $("#job_pause").attr("disabled", bttnDisabled);

            if (bttnDisabled) {
                self.setupStatusCheck();
                msgElem.show();
            }
            else {
                self.cancelStatusCheck();
                msgElem.hide();
            }
        };

        self.updateStatus = () => {
            OctoPrint.plugins.filamentencore.getStatus().done(function (response) {
                if (!response) return;
                self.onFilamentChanged(response.status)
            });
        }

        self.onEventPrintPaused = self.updateStatus;

        self.setupStatusCheck = () => {
            if (self.handle) return;
            self.handle = setInterval(() => self.updateStatus(), 500);
        }

        self.cancelStatusCheck = () => {
            if (!self.handle) return;
            clearInterval(self.handle);
            self.handle = null;
        }

    }

    OCTOPRINT_VIEWMODELS.push({
        construct: FilamentViewModel,
        additionalNames: ["filamentViewModel"],
        dependencies: [],
        elements: []
    });
});