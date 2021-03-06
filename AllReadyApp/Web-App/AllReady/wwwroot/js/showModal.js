﻿///<reference path="../lib/jquery/dist/jquery.js" />
///<reference path="../lib/knockout/dist/knockout.js" />

var HTBox = HTBox || {};
(function() {
    "use strict";
    //
    // This is a wrapper around the Bootstrap modal dialog that encapsulates the Bootstrap modal with a Knockout view model,
    // providing a clear separation of concerns between the view model and UI.
    //
    var __viewModel;
    var __modalId;
    var __$modalElement;
    var __onCloseCallbackFn;
    var __onCancelCallbackFn;

    function showModal(options) {
        if (typeof options === "undefined") throw new Error("An options argument is required.");
        if (typeof options.viewModel !== "object") throw new Error("options.viewModel is required.");
        if (!options.modalId) throw new Error("options.modalId is required.");

        __viewModel = options.viewModel;
        __modalId = options.modalId;
        __$modalElement = $("#" + __modalId);
        __onCloseCallbackFn = null;
        __onCancelCallbackFn = null;

        ko.cleanNode(__$modalElement[0]);
        ko.applyBindings(__viewModel, __$modalElement[0]);
        showTwitterBootstrapModal(__$modalElement);

        function __onClose(callbackFn) {
            if (typeof callbackFn !== "function") {
                throw new Error("the parameter passed to `onClose` must be a function");
            }
            __onCloseCallbackFn = callbackFn;
            return this;
        }

        function __onCancel(callbackFn) {
            if (typeof callbackFn !== "function") {
                throw new Error("the parameter passed to `onCancel` must be a function");
            }
            __onCancelCallbackFn = callbackFn;
            return this;
        }


        function __close(callbackParam) {
            __hide();
            if (typeof __onCloseCallbackFn === "function") {
                __onCloseCallbackFn(callbackParam);
            }
        }

        function __cancel(callbackParam) {
            __hide();
            if (typeof __onCancelCallbackFn === "function") {
                __onCancelCallbackFn(callbackParam);
            }
        }

        function __hide() {
            __$modalElement.modal("hide");
        }

        function __show() {
            __$modalElement.modal("show");
        }

        return {
            hide: __hide,
            show: __show,
            close: __close,
            cancel: __cancel,
            onClose: __onClose,
            onCancel: __onCancel
        }
    };

    function showTwitterBootstrapModal($modalelement) {
        $modalelement.modal({
            // Clicking the backdrop, or pressing Escape, shouldn't automatically close the modal by default.
            // The view model should remain in control of when to close.
            backdrop: "static",
            keyboard: false
        });
    };
    
    HTBox.showModal = showModal;
}());