(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["OctoPrintClient"], factory);
    } else {
        factory(global.OctoPrintClient);
    }
})(this, function (OctoPrintClient) {

    var OctoPrintFilamentClient = function (base) {
        this.base = base;

        this.baseUrl = this.base.getBlueprintUrl("filamentencore");
        this.statusUrl = this.baseUrl + "status";

    };

    OctoPrintFilamentClient.prototype.getStatus = function (opts) {
        return this.base.get(this.statusUrl, opts);
    };

    // register plugin component
    OctoPrintClient.registerPluginComponent("filamentencore", OctoPrintFilamentClient);


    return OctoPrintFilamentClient;
});