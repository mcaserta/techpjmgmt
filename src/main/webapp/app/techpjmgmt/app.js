Ext.Loader.setConfig({enabled:true});
Ext.Loader.setPath('Ext.ux', 'ux');
Ext.require('Ext.ux.window.Notification');


Ext.application({
        name:'Techpjmgmt',

        autoCreateViewport:true,
        models:['Developer', 'DeveloperRole', 'Project'],
        stores:['Developers', 'DeveloperRoles', 'Projects','ComboProjects'],
        controllers:['DeveloperController','ProjectController'],
        appFolder:'app/techpjmgmt',


        launch:function () {
            Ext.override(Ext.data.Store, {
                constructor:function (config) {
                    config = config || {};
                    this.addEvents(
                        'afterwrite'
                    );
                    this.callOverridden([config]);
                },

                onProxyWrite:function (operation) {
                    this.callOverridden(arguments);
                    this.fireEvent('afterwrite', operation);

                },
                commitChanges:function () {
                    Ext.each(this.getUpdatedRecords(), function (rec) {
                        rec.commit();
                    });

                    Ext.each(this.getNewRecords(), function (rec) {
                        rec.commit();
                        rec.phantom = false;
                    });

                    this.removed = [];
                }, // commitChanges

                rejectChanges:function () {
                    var rLength = this.removed.length;
                    for (var i = 0; i < rLength; i++) {
                        this.insert(this.removed[i].lastIndex || 0, this.removed[i]);
                    }

                    this.remove(this.getNewRecords());

                    this.each(function (rec) {
                        rec.reject();
                    });

                    this.removed = [];
                } // rejectChanges

            }); // Ext.data.Store
        }


    }
)
;




