Ext.define('Techpjmgmt.store.DeveloperRoles', {
    extend:'Ext.data.Store',
    model:'Techpjmgmt.model.DeveloperRole',
    proxy:{
        type:'ajax',
        url:'data/developerRoles.js',
        reader:{
            root:'results'
        }
    },
    autoLoad : false
});