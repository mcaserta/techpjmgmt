Ext.define('Techpjmgmt.controller.DeveloperController', {
    extend:'Ext.app.Controller',

    refs:[
        {
            ref:'southContainer',
            selector:'#southcontainer'
        },
        {
            ref:'developerProjectGrid',
            selector:'#developerprojectgrid'
        },
        {
            ref:'developerGrid',
            selector:'#developergrid'
        }
    ],
    stores:['Developers'],

    init:function () {
        var developersStore = this.getDevelopersStore(),
            me = this;

        //pulsante di cancellazione del developer
        this.control({
            '#developergrid #deletebutton':{
                deletepressed:this.onDeletePressed
            }});

        //pulsante di recupero dei progetti associati
        this.control({
            '#developergrid #projectsbutton':{
                projectspressed:this.onProjectsPressed
            }});

        this.control({
            '#developergrid #addbutton':{
                click:function (button, event, eOpts) {
                    var developerGrid = this.getDeveloperGrid(),
                        rec = Ext.create(Techpjmgmt.model.Developer),
                        edit = developerGrid.editingPlugin;

                    edit.cancelEdit();
                    developersStore.insert(0, rec);
                    edit.startEditByPosition({
                        row:0,
                        column:0
                    });


                }
            }});


        //l'evento afterwrite viene sollevato dopo l'invocazione al proxy nel caso di successo (lo store deve estendere)
        developersStore.on('afterwrite', function (operation) {
            var records = operation.records,
                name = records[0].get("name"),
                surname = records[0].get("surname");
            me.info(name, surname);
        });
        developersStore.on('write', function (store, operation, eOpts) {
            var records = operation.records,
                results = operation.getResultSet().records;
            if (operation.action === 'create') {
                //setto l'id del nuovo record come lo ha generato il server
                records[0].setId(results[0].get("id"));
            }
        });
        developersStore.getProxy().on('exception', function (proxy, response, operation, eOpts) {
            developersStore.rejectChanges();
            me.error();

        });
        developersStore.load();
    },


    onDeletePressed:function (grid, rowIndex, colIndex) {
        var store = this.getDevelopersStore(),
            rec = store.getAt(rowIndex),
            southContainer = this.getSouthContainer();
        store.remove(rec);
        if (southContainer.currRec && southContainer.currRec.get("id") === rec.get("id")) {
            southContainer.removeAll();
            delete southContainer.currRec;
        }

    },


    onProjectsPressed:function (grid, rowIndex, colIndex) {
        var store = this.getDevelopersStore(),
            rec = store.getAt(rowIndex),
            name = rec.get("name"),
            surname = rec.get("surname"),
            southContainer = this.getSouthContainer(),
            developerprojectgrid = this.getDeveloperProjectGrid(),
            me = this,
            projectsStore = rec.projects();

        if (developerprojectgrid) {
            developerprojectgrid.destroy();
        }
        southContainer.currRec = rec;
        southContainer.add(Ext.create('Techpjmgmt.view.DeveloperProjectGrid', {
            itemId:'developerprojectgrid',
            store:projectsStore,
            dockedItems:[
                {
                    xtype:'toolbar',
                    dock:'top',
                    items:[
                        {
                            xtype:'button',
                            itemId:'addbutton',
                            text:'add:',
                            iconCls:'addBtn'
                        },

                        {
                            xtype:'combo',
                            itemId:'searchtext',
                            value:'search',
                            name:'searchField',
                            forceSelection:false,
                            store:'ComboProjects',
                            multiSelect:false,
                            queryMode:'local',
                            valueField:'id',
                            displayField:'name',
                            listeners:{
                                change:{
                                    fn:function (combo, newValue, oldValue, eOpts) {
                                        this.fireEvent("searchtxtchanged", combo, newValue, oldValue, eOpts);
                                    },
                                    buffer:500
                                }
                            }

                        }

                    ]

                }
            ],
            title:rec.get('name') + ' ' + rec.get('surname') + '\'s projects'
        }));

    },


    error:function () {
        Ext.ux.window.Notification.error('Attenzione', "Errore nell'aggiornamento dei dati");
    },


    info:function (name, surname) {
        Ext.ux.window.Notification.info(name + " " + surname, "aggiornamento effettuato con successo");

    }

})
;

