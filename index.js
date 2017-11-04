var CONSOLE_METHOD = ['log', 'error', 'info', 'warn', 'dir', 'time', 'timeEnd', 'clear', 'table', 'assert', 'count', 'debug'];

var logger = {
    errors:[],
    timer:null,
    url:'',
    init:function(opts){
        this.url = opts.url;
    },
    bind:function(){

    },
    add: function(err){
        this.errors.push(err);
        this.startTimer();
    },
    startTimer:function(){
        var self = this;
        if(!self.timer){
            //30s发送所有错误
            self.timer = setTimeout(function(){
                if(self.errors.length > 0){
                    clearTimeout(self.timer);
                    self.timer = null;                    
                    self.send();
                    self.errors.length = 0;
                }
            },30000);
        }
    },
    send:function(){
        
    },
    _rejectionHandler:function(e){
        this.add(e);
    },
    overrideConsole:function()
    {
        var self = this,
            errors = this.errors,
            origConsole = this._origConsole = {},
            winConsole = window.console;

        CONSOLE_METHOD.forEach(function(name)
        {
            var origin = origConsole[name] = function(){};
            if (winConsole[name]){
                origin = origConsole[name] = winConsole[name].bind(winConsole);
            }
            winConsole[name] = function(){
                self.add(arguments);
                origin(arguments);
            }
        });

        return this;
    },
    restoreConsole:function()
    {
        var self = this;
        
        if (!this._origConsole){
            return this;
        }

        CONSOLE_METHOD.forEach(function(name){
            window.console[name] = self._origConsole[name];
        });

        delete this._origConsole;

        return this;
    },
    catchGlobalErr:function()
    {
        var self = this;
        self._origOnerror = window.onerror;
        //window的error错误
        window.onerror = function(errMsg, url, lineNum, column, errObj){
            self.add(errObj ? errObj : errMsg);
        }
        //promise的未捕获错误
        window.addEventListener('unhandledrejection', this._rejectionHandler);

        return this;
    },
    ignoreGlobalErr:function()
    {
        if (this._origOnerror)
        {
            window.onerror = this._origOnerror;
            delete this._origOnerror;
        }
        window.removeEventListener('unhandledrejection', this._rejectionHandler);

        return this;
    },
    destroy:function(){
        this.ignoreGlobalErr();
        this.restoreConsole();
    }
}