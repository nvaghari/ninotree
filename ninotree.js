if (typeof (ninotree) === 'undefined') {
    var ninotree = {
        test: {
            data: [
                {
                    id: 1,
                    name: 'A',
                    selected: false,
                    childs: [
                        {
                            id: 5,
                            name: 'A-1',
                            selected: true,
                            childs: []
                        },
                        {
                            id: 6,
                            name: 'A-2',
                            selected: false,
                            childs: [
                                {
                                    id: 7,
                                    name: 'A2-1',
                                    selected: false,
                                    childs: []
                                }
                            ]
                        },
                        {
                            id: 8,
                            name: 'A-3',
                            selected: false,
                            childs: []
                        }
                    ]
                },
                {
                    id: 2,
                    name: 'B',
                    selected: false,
                    childs: [
                        {
                            id: 3,
                            name: 'B-1',
                            selected: false,
                            childs: []
                        },
                        {
                            id: 4,
                            name: 'B-2',
                            selected: false,
                            childs: []
                        }
                    ]
                }
            ],
            getSignleValue: function () {
                var htmlNode = document.getElementById(ninotree.single.fields.id+'Form');
                var form = new FormData(htmlNode);
                var result = form.get(ninotree.single.fields.id);
                console.log(result);
                return result;
            }
        },
        single: {
            fields: {
                id: '',
                html: ''
            },
            methods: {
                makeForm: function (data) {
                    ninotree.single.fields.html += `<form id="${ninotree.single.fields.id}Form">`;
                    ninotree.single.fields.html += ninotree.single.methods.makeHTML(data);
                    ninotree.single.fields.html += '</form>';
                    return ninotree.single.fields.html;
                },
                makeHTML: function (data) {
                    if (data && data.length > 0) {
                        ninotree.single.fields.html += '<ul>';
                        data.forEach(node => {
                            var hasChild = node.childs && node.childs.length > 0;
                            if (hasChild) {
                                ninotree.single.fields.html += ninotree.single.methods.getParentNode(node);
                                ninotree.single.methods.makeHTML(node.childs);
                                ninotree.single.fields.html += '</li>';
                            }
                            else {
                                ninotree.single.fields.html += ninotree.single.methods.getChildNode(node);
                            }
                        });
                        ninotree.single.fields.html += '</ul>';
                    }
                    return ninotree.single.fields.html;
                },
                registerCarets: function () {
                    var carets = document.getElementsByClassName('caret');
                    for (caret of carets) {
                        caret.addEventListener('click', function () {
                            this.parentElement.querySelector('ul').classList.toggle('collapsed');
                            this.classList.toggle('fa-caret-right');
                            this.classList.toggle('fa-caret-down');
                        });
                    }
                },
                getParentNode: function (node) {
                    if(node.selected){
                        return `<li><i class="fas fa-caret-down  caret"></i><input class="custom-control-input" type="radio" checked name="${ninotree.single.fields.id}" id="${node.id}" value="${node.id}"><label class="custom-control-label" for="${node.id}">${node.name}</label>`;
                    }
                    return `<li><i class="fas fa-caret-down  caret"></i><input class="custom-control-input" type="radio" name="${ninotree.single.fields.id}" id="${node.id}" value="${node.id}"><label class="custom-control-label" for="${node.id}">${node.name}</label>`;
                },
                getChildNode: function (node) {
                    if(node.selected){
                       return `<li><input class="custom-control-input" type="radio" checked name="${ninotree.single.fields.id}" id="${node.id}" value="${node.id}"><label class="custom-control-label" for="${node.id}">${node.name}</label></li>`;
                    }
                    return `<li><input class="custom-control-input" type="radio" name="${ninotree.single.fields.id}" id="${node.id}" value="${node.id}"><label class="custom-control-label" for="${node.id}">${node.name}</label></li>`;
                }
            },
            init: function (id, data) {
                ninotree.single.fields.id = id;
                var htmlNode = document.getElementById(id);
                if (!htmlNode) {
                    console.error('tree does not exist');
                    return;
                }
                htmlNode.classList.add('ninotree');
                htmlNode.classList.add('custom-control');
                htmlNode.classList.add('custom-radio');
                htmlNode.innerHTML = ninotree.single.methods.makeForm(data);
                ninotree.single.methods.registerCarets();
            }
        },
        multiple: {}
    }
}

document.addEventListener("DOMContentLoaded", function () {
    ninotree.single.init('tree', ninotree.test.data);
});