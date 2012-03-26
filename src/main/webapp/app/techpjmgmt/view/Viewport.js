Ext.define('Techpjmgmt.view.Viewport', {
    extend:'Ext.container.Viewport',
    requires:[
        'Techpjmgmt.view.DeveloperGrid',
        'Techpjmgmt.view.DeveloperProjectGrid'

    ],
    border:0,
    layout:'border',
    items:[
        {
            region:'center',
            itemId:'developergrid',
            width:'100%',
            height:'70%',
            border:false,
            xtype:'developergrid'
        },
        {
            itemId:'southcontainer',
            region:'south',
            height:'30%',
            border:false
        }
    ]
});
