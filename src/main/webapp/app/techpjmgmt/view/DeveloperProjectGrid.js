Ext.define('Techpjmgmt.view.DeveloperProjectGrid', {
    extend:'Ext.grid.Panel',
    alias:'widget.developerprojectgrid',
    border:false,
    disableSelection:true,
    itemId:'developerprojectgrid',

    dockedItems:[
        {
            xtype:'toolbar',
            dock:'top',
            items:[
                {
                    xtype:'button',
                    itemId:'addbutton',
                    text:'People',
                    iconCls:'people16'
                },

                {
                    xtype:'combo',
                    itemId:'searchtext',
                    value:'search',
                    name:'searchField',
                    forceSelection:false,
                    store:'ComboProjects',
                    multiSelect:false,
                    autoSelect:false,
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

    columns:[
        {
            xtype:'rownumberer',
            flex:1,
            sortable:false
        },
        {
            text:'Name',
            dataIndex:'name',
            flex:5
        },
        {
            text:'Project year',
            dataIndex:'pjyear',
            flex:3
        },
        {
            text:'Description',
            dataIndex:'description',
            flex:5
        },
        {
            xtype:'actioncolumn',
            itemId:'deletebutton',
            flex:1,
            items:[
                {
                    icon:'images/user_group.png',
                    tooltip:'Delete',
                    handler:function (grid, rowIndex, colIndex) {
                        this.fireEvent('deletepressed', grid, rowIndex, colIndex)
                    }
                }
            ]
        }

    ],

    onTextFieldChange:function () {
        debugger;
    }

});