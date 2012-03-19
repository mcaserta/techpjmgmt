var rolesEditor = Ext.create('Ext.grid.CellEditor', { field:Ext.create('Ext.form.field.ComboBox', {
    editable:false,
    multiSelect:true,
    valueField:'label',
    displayField:'label',
    store:'DeveloperRoles'
})});


Ext.define('Techpjmgmt.view.DeveloperGrid', {
    extend:'Ext.grid.Panel',
    alias:'widget.developergrid',
    store:'Developers',
    border:false,
    title:'Developers',
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
                    xtype:'textfield',
                    itemId:'searchtext',
                    value:'search',
                    name:'searchField'
                }

            ]

        }
    ],

    columns:[
        {
            text:'Name',
            dataIndex:'name',
            flex:5,
            editor:{
                xtype:'textfield'
            }
        },
        {
            text:'Surname',
            dataIndex:'surname',
            flex:5,
            editor:{
                xtype:'textfield'
            }
        },
        {
            text:'Email',
            dataIndex:'email',
            flex:3,
            editor:{
                xtype:'textfield'
            }
        },
        {
            text:'projects',
            xtype:'actioncolumn',
            itemId:'projectsbutton',
            items:[
                {
                    icon:'images/user_group.png',
                    tooltip:'Projects',
                    handler:function (grid, rowIndex, colIndex) {
                        this.fireEvent('projectspressed', grid, rowIndex, colIndex)
                    }
                }
            ]
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


    plugins:[
        Ext.create('Ext.grid.plugin.CellEditing')
    ]




});