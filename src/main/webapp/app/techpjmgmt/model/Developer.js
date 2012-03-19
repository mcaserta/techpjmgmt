Ext.define('Techpjmgmt.model.Developer', {
    extend:'Ext.data.Model',
    fields:[
        'id', 'name', 'surname', 'email'
    ],
    hasMany:{model:'Techpjmgmt.model.Project', name:'projects'},
    validations: [{
        type: 'length',
        field: 'name',
        min: 1
    }, {
        type: 'length',
        field: 'surname',
        min: 1
    }, {
        type: 'length',
        field: 'email',
        min: 1
    }],

    proxy:{
        type:'ajax',
        api:{
            create:'data/developers/new',
            read:'data/developers/',
            update:'data/developers/update',
            destroy:'data/developers/destroy'
        },
        reader:{
            root:'results'
        }
    }

});