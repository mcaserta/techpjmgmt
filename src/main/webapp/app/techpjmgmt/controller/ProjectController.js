Ext.define('Techpjmgmt.controller.ProjectController', {
    extend:'Ext.app.Controller',

    refs:[
        {
            ref:'developerProjectGrid',
            selector:'#developerprojectgrid'
        },
        {
            ref:'addProject',
            selector:'#developerprojectgrid #addbutton'
        },
        {
            ref:'southContainer',
            selector:'#southcontainer'
        },
        {
            ref:'searchText',
            selector:'#developerprojectgrid #searchtext'
        }


    ],
    stores:['ComboProjects', 'Projects'],

    init:function () {
        //pulsante di cancellazione del progetto associato ad un developer
        this.control({
            '#developerprojectgrid #deletebutton':{
                deletepressed:this.onProjectDeletePressed
            }});

        //combo di ricerca progetto
        this.control({
            '#developerprojectgrid #searchtext':{
                searchtxtchanged:this.onSearchTxtChanged
            }});

        this.control({
            '#developerprojectgrid #searchtext':{
                beforerender:function (combo) {
                    var currStore = this.getDeveloperProjectGrid().getStore();
                    this.filterComboStore(currStore, combo.getStore());

                }
            }});

        this.control({
            '#developerprojectgrid #addbutton':{
                click:this.onProjectAdd
            }});

        this.initialData = [];
        this.getComboProjectsStore().load(
            {
                scope:this,
                callback:function (records) {
                    records.forEach(function (r) {
                            this.initialData.push(r.copy())
                        },this
                    )
                }
            });

    },

    onProjectDeletePressed:function (grid, rowIndex, colIndex) {
        var store = grid.getStore(),
            rec = store.getAt(rowIndex),
            currRec = this.getSouthContainer().currRec,
            comboStore = this.getComboProjectsStore(),
            proxy = store.getProxy(),
            me = this;

        proxy.extraParams = {
            'iddev':currRec.get('id')
        };

        proxy.on('exception', function (proxy, response, operation, eOpts) {
            store.rejectChanges();
            me.error()
        }, this, {single:true});
        store.on('afterwrite', function (operation) {
            me.info(currRec.get('name'), currRec.get('surname'));
        }, this, {single:true});

        store.remove(rec);
        store.sync();
        this.filterComboStore(store, comboStore);


    },

    onProjectAdd:function (combo, newValue, oldValue, eOpts) {
        var me = this,
            projectId = this.getSearchText().getSubmitValue(),
            currStore = this.getDeveloperProjectGrid().getStore(),
            projectStore = this.getProjectsStore(),
            proxy = projectStore.getProxy(),
            comboStore = this.getComboProjectsStore(),
            recFromCombo = comboStore.getById(projectId),
            currDeveloperRec = this.getSouthContainer().currRec,
            recToSave;

        if (projectId && projectId !== 'search') {
            recToSave = recFromCombo.copy();
            recToSave.phantom = true;
            currStore.add(recFromCombo);
            projectStore.add(recToSave);
            proxy.extraParams = {
                'iddev':currDeveloperRec.get('id')
            };

            proxy.on('exception', function (proxy, response, operation, eOpts) {
                projectStore.rejectChanges();
                currStore.rejectChanges();
                me.error()
            }, this, {single:true});
            projectStore.on('afterwrite', function (operation) {
                me.info(currDeveloperRec.get('name'), currDeveloperRec.get('surname'));
            }, this, {single:true});

            projectStore.sync();
            this.filterComboStore(currStore, comboStore);
        }
    },

    /**
     * utilizzata per filtrare lo store del combo
     * eliminando i progetti già associati
     * @param currProjectStore
     * @param comboStore
     */
    filterComboStore:function (currProjectStore, comboStore) {
        comboStore.removeAll();
        comboStore.add(this.initialData);
        toRemove = [];
        comboStore.each(function (record) {
            if (currProjectStore.getById(record.get("id"))) {
                toRemove.push(record);
            }
            comboStore.remove(toRemove);
        });
        this.getSearchText().initValue();


    },

    onSearchTxtChanged:function (combo, newValue, oldValue, eOpts) {
        var comboStore = this.getComboProjectsStore(),
            index = comboStore.find('name', newValue, 0, false, true, false);

        if (index !== -1) {
            combo.select(combo.getStore().data.items[0]);
        }

    },


    error:function () {
        Ext.ux.window.Notification.error('Attenzione', "Errore nell'aggiornamento dei dati");
    },


    info:function (name, surname) {
        Ext.ux.window.Notification.info(name + " " + surname, "aggiornamento effettuato con successo");

    }

})
;

