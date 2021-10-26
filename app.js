
const editor = grapesjs.init({
    container: '#gjs',
    fromElement: true,
    height: '300px',
    width: 'auto',
    storageManager: false,
    layerManager: {
        appendTo: '.layers-container'
    },
    panels: {
        defaults: [
            {
                id: 'layers',
                el: '.panel__right',
                resizable: {
                    maxDim: 350,
                    minDim: 200,
                    tc:0,
                    cl:1,
                    cr:0,
                    bc:0,
                    keyWidth: 'flex-basis',
                    },
            },
            {
                id: 'panel-switcher',
                el: '.panel__switcher',
                buttons: [{
                    id: 'show-layers',
                    active: true,
                    label: 'Layers',
                    command: 'show-layers',
                    togglable: false,
                    },
                    {
                        id:'show-style',
                        active: true,
                        label: 'Styles',
                        command: 'show-styles',
                        togglable: false,
                    },
                    {
                        id: 'show-traits',
                        active: true,
                        label: 'Traits',
                        command: 'show-traits',
                        togglable: false,
                    }
                ]
            },
            {
                id: 'panel-devices',
                el: '.panel__devices',
                buttons: [{
                    id:'device-desktop',
                    label: 'D',
                    command: 'set-device-desktop',
                    active: true,
                    toggable: false,
                },{
                    id: 'device-mobile',
                    label: 'M',
                    command: 'set-device-mobile',
                    togglable: false,
                }]
            }
        ]
    },
    
    storageManager:{
        id: 'gjs-',
        type: 'local',
        autosave: true,
        autoload: true,
        stepsBeforeSave: 1,
        storeComponents:true,
        storeStyles: true,
        storeHtml: true,
        storeCss: true,
    },
    
    traitManager: {
        appendTo: '.traits-container'
    },
    
    selectorManager: {
        appendTo: '.styles-container'
    },
    styleManager: {
    appendTo: '.styles-container',
    sectors: [{
        name: 'Dimension',
        open: false,
        // Use built-in properties
        buildProps: ['width', 'min-height', 'padding'],
        // Use `properties` to define/override single property
        properties: [
            {
            // Type of the input,
            // options: integer | radio | select | color | slider | file | composite | stack
            type: 'integer',
            name: 'The width', // Label for the property
            property: 'width', // CSS property (if buildProps contains it will be extended)
            units: ['px', '%'], // Units, available only for 'integer' types
            defaults: 'auto', // Default value
            min: 0, // Min value, available only for 'integer' types
            }
        ]
        },{
        name: 'Extra',
        open: false,
        buildProps: ['background-color', 'box-shadow', 'custom-prop'],
        properties: [
            {
            id: 'custom-prop',
            name: 'Custom Label',
            property: 'font-size',
            type: 'select',
            defaults: '32px',
            // List of options, available only for 'select' and 'radio'  types
            options: [
                { value: '12px', name: 'Tiny' },
                { value: '18px', name: 'Medium' },
                { value: '32px', name: 'Big' },
            ],
            }
        ]
        }]
    },

    blockManager: {
        appendTo: '#blocks',
        blocks:[
            {
                id: 'section',
                label: '<b>Section</b>',
                atributes: {
                    class:'gjs-block-section'
                },
                content: `<section>
                <h1>This is a simple title</h1>
                <div>This si just a Lorem text: Lorem ipsum dolor sit amet</div>
                </section>`,
            }, {
                id: 'text',
                label: 'Text',
                content: '<div data-gjs-type="text>Insert your text here</div>',
            }, {
                id: 'image',
                lable: 'Image',
                select: true,
                content: {type: 'image'},
                activate: true,
            }
        ]
    },
    mediaCondition: 'min-width',
    deviceManager:{
        devices: [{
            name: 'Mobile',
            width:'320',
            widthMedia: '',

        },
        {
            name: 'Desktop',
            width: '',
            widthMedia: '1024',
        }
    
    ]
    }
});

editor.Commands.add('set-device-desktop',{
    run: editor => editor.setDevice('Desktop')
});
editor.Commands.add('set-device-mobile',{
    run: editor => editor.setDevice('Mobile')
});

editor.Commands.add('show-traits', {
    getTraitsEl(editor){
        const row = editor.getContainer().closest('.editor-row');
        return row.querySelector('.traits-container');
    },
    run(editor, sender){
        this.getTraitsEl(editor).style.display = '';
    },
    stop(editor, sender) {
        this.getTraitsEl(editor).style.display = 'none';
      },
})

editor.Commands.add('show-layers', {
  getRowEl(editor) { return editor.getContainer().closest('.editor-row'); },
  getLayersEl(row) { return row.querySelector('.layers-container') },

  run(editor, sender) {
    const lmEl = this.getLayersEl(this.getRowEl(editor));
    lmEl.style.display = '';
  },
  stop(editor, sender) {
    const lmEl = this.getLayersEl(this.getRowEl(editor));
    lmEl.style.display = 'none';
  },
});
editor.Commands.add('show-styles', {
  getRowEl(editor) { return editor.getContainer().closest('.editor-row'); },
  getStyleEl(row) { return row.querySelector('.styles-container') },

  run(editor, sender) {
    const smEl = this.getStyleEl(this.getRowEl(editor));
    smEl.style.display = '';
  },
  stop(editor, sender) {
    const smEl = this.getStyleEl(this.getRowEl(editor));
    smEl.style.display = 'none';
  },
});

editor.BlockManager.add('my-block-id', {
    label: 'Label',
    category: 'Super Category',
    content: {
        tagName: 'div',
        draggable: true,
        attributes: { 'some-attribute': 'some-value'},
        components: [
            {
                tagName:'span',
                content: '<b>Some static content</b>',
            }, {
                tagName: 'div',
                components: '<span>HTML at some point</span>',
            }
        ]

    }
})

editor.on('change:device', ()=> console.log('Current device: ', editor.getDevice() ));

// const wrapper = editor.DomComponents.getWrapper();
// const myComponent = wrapper.find('div.my-component')[0];
// myComponent.components().forEach(component => /* ... do something ... */);
// myComponent.components('<div>New content</div>');

editor.Panels.addPanel({
    id: 'panel-top',
    el: '.panel__top',
  });
  editor.Panels.addPanel({
    id: 'basic-actions',
    el: '.panel__basic-actions',
    buttons: [
      {
        id: 'visibility',
        active: true, // active by default
        className: 'btn-toggle-borders',
        label: '<u>Bob</u>',
        command: 'sw-visibility', // Built-in command
      }, {
        id: 'export',
        className: 'btn-open-export',
        label: 'Exp',
        command: 'export-template',
        context: 'export-template', // For grouping context of buttons from the same panel
      }, {
        id: 'show-json',
        className: 'btn-show-json',
        label: 'JSON',
        context: 'show-json',
        command(editor) {
          editor.Modal.setTitle('Components JSON')
            .setContent(`<textarea style="width:100%; height: 250px;">
              ${JSON.stringify(editor.getComponents())}
            </textarea>`)
            .open();
        },
      }
    ],
  });
  editor.setDevice('Mobile');