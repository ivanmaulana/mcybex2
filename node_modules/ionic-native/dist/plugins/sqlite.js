"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var plugin_1 = require('./plugin');
/**
 * @name SQLite
 */
var SQLite = (function () {
    function SQLite(config) {
        var _this = this;
        new Promise(function (resolve, reject) {
            sqlitePlugin.openDatabase(config, resolve, reject);
        }).then(function (db) { return _this._objectInstance = db; }, function (error) { return console.warn(error); });
    }
    Object.defineProperty(SQLite.prototype, "databaseFeatures", {
        get: function () {
            return this._objectInstance.databaseFeatures;
        },
        enumerable: true,
        configurable: true
    });
    SQLite.prototype.addTransaction = function (transaction) { };
    SQLite.prototype.transaction = function (fn) { return; };
    SQLite.prototype.readTransaction = function (fn) { return; };
    SQLite.prototype.startNextTransaction = function () { };
    SQLite.prototype.close = function () { return; };
    SQLite.prototype.start = function () { };
    SQLite.prototype.executeSql = function (statement, params) { return; };
    SQLite.prototype.addSatement = function (sql, values) { return; };
    SQLite.prototype.sqlBatch = function (sqlStatements) { return; };
    SQLite.prototype.abortallPendingTransactions = function () { };
    SQLite.prototype.handleStatementSuccess = function (handler, response) { };
    SQLite.prototype.handleStatementFailure = function (handler, response) { };
    SQLite.prototype.run = function () { };
    SQLite.prototype.abort = function (txFailure) { };
    SQLite.prototype.finish = function () { };
    SQLite.prototype.abortFromQ = function (sqlerror) { };
    SQLite.echoTest = function () { return; };
    SQLite.deleteDatabase = function (first) { return; };
    __decorate([
        plugin_1.CordovaInstance({
            sync: true
        })
    ], SQLite.prototype, "addTransaction", null);
    __decorate([
        plugin_1.CordovaInstance()
    ], SQLite.prototype, "transaction", null);
    __decorate([
        plugin_1.CordovaInstance()
    ], SQLite.prototype, "readTransaction", null);
    __decorate([
        plugin_1.CordovaInstance({
            sync: true
        })
    ], SQLite.prototype, "startNextTransaction", null);
    __decorate([
        plugin_1.CordovaInstance()
    ], SQLite.prototype, "close", null);
    __decorate([
        plugin_1.CordovaInstance({
            sync: true
        })
    ], SQLite.prototype, "start", null);
    __decorate([
        plugin_1.CordovaInstance()
    ], SQLite.prototype, "executeSql", null);
    __decorate([
        plugin_1.CordovaInstance()
    ], SQLite.prototype, "addSatement", null);
    __decorate([
        plugin_1.CordovaInstance()
    ], SQLite.prototype, "sqlBatch", null);
    __decorate([
        plugin_1.CordovaInstance({
            sync: true
        })
    ], SQLite.prototype, "abortallPendingTransactions", null);
    __decorate([
        plugin_1.CordovaInstance({
            sync: true
        })
    ], SQLite.prototype, "handleStatementSuccess", null);
    __decorate([
        plugin_1.CordovaInstance({
            sync: true
        })
    ], SQLite.prototype, "handleStatementFailure", null);
    __decorate([
        plugin_1.CordovaInstance({
            sync: true
        })
    ], SQLite.prototype, "run", null);
    __decorate([
        plugin_1.CordovaInstance({
            sync: true
        })
    ], SQLite.prototype, "abort", null);
    __decorate([
        plugin_1.CordovaInstance({
            sync: true
        })
    ], SQLite.prototype, "finish", null);
    __decorate([
        plugin_1.CordovaInstance({
            sync: true
        })
    ], SQLite.prototype, "abortFromQ", null);
    __decorate([
        plugin_1.Cordova()
    ], SQLite, "echoTest", null);
    __decorate([
        plugin_1.Cordova()
    ], SQLite, "deleteDatabase", null);
    SQLite = __decorate([
        plugin_1.Plugin({
            pluginRef: 'sqlitePlugin',
            plugin: 'cordova-sqlite-storage',
            repo: 'https://github.com/litehelpers/Cordova-sqlite-storage'
        })
    ], SQLite);
    return SQLite;
}());
exports.SQLite = SQLite;
//# sourceMappingURL=sqlite.js.map