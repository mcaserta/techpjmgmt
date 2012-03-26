Ext.define('Techpjmgmt.view.DeveloperProjectGrid', {
    extend:'Ext.grid.Panel',
    alias:'widget.developerprojectgrid',
    border:false,
    disableSelection:true,
    itemId:'developerprojectgrid',

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
                    icon:'images/delete.png',
                    tooltip:'Delete',
                    handler:function (grid, rowIndex, colIndex) {
                        this.fireEvent('deletepressed', grid, rowIndex, colIndex)
                    }
                }
            ]
        }

    ]

});