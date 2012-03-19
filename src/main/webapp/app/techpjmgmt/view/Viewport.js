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
            xtype:'panel',
            itemId:'gridcontainer',
            width:'100%',
            height:'70%',
            border: false,
            items:{
                itemId:'developergrid',
                xtype:'developergrid'
            }
        },
        {
            itemId:'southcontainer',
            region:'south',
            height:'30%',
            border: false
/*
            title:'Projects',
            items:{
                xtype:'developerprojectgrid'
            }
*/

        }
    ]
});
