Ext.define('Techpjmgmt.store.ComboProjects', {
    extend:'Ext.data.Store',
    model:'Techpjmgmt.model.Project',
    autoLoad : false,
/*
    data : [
            {'id':'1','name':'psg','pjyear':'2009','description':'description'}
        ]
*/

    proxy:{
        type:'ajax',
        api:{
            read:'data/projects/'
        },
        reader:{
            root:'results'
        }
    }


});