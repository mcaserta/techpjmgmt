Ext.define('Techpjmgmt.model.Project', {
        extend:'Ext.data.Model',
        fields:[
            'id', 'name', 'pjyear', 'description', 'version'
        ],
        proxy:{
            type:'ajax',
            api:{
                create:'data/projects/new',
                destroy:'data/developers/destroyproject'
/*
                read:'data/projects/',
                update:'data/developers/update',
*/
            }
        }
    }
);